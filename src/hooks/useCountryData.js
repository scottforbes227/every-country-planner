import { useState, useMemo, useEffect, useCallback } from "react";

export default function useCountryData({ activeTrips, visitedCountries, totalCountries, diffOrder }) {
  const [tab, setTab] = useState("trips");
  const [exp, setExp] = useState(null);
  const [sort, setSort] = useState("priority");
  const [region, setRegion] = useState("All");
  const [search, setSearch] = useState("");
  const [diffFilter, setDiffFilter] = useState("All");
  const [dark, setDark] = useState(() => {
    try {
      return localStorage.getItem("ecp-dark") === "true";
    } catch {
      return false;
    }
  });
  const [done, setDone] = useState(() => {
    try {
      const s = localStorage.getItem("ecp-done");
      return s ? new Set(JSON.parse(s)) : new Set();
    } catch {
      return new Set();
    }
  });
  const [hovered, setHovered] = useState(null);

  useEffect(() => {
    try {
      localStorage.setItem("ecp-dark", dark);
    } catch {
      // ignored
    }
  }, [dark]);

  useEffect(() => {
    try {
      localStorage.setItem("ecp-done", JSON.stringify([...done]));
    } catch {
      // ignored
    }
  }, [done]);

  const regions = useMemo(() => ["All", ...Array.from(new Set(activeTrips.map(t => t.region)))], [activeTrips]);
  const difficulties = useMemo(() => ["All", ...Array.from(new Set(activeTrips.map(t => t.difficulty)))], [activeTrips]);

  const sorted = useMemo(() => {
    let f = activeTrips.filter(t => region === "All" || t.region === region);
    if (diffFilter !== "All") f = f.filter(t => t.difficulty === diffFilter);
    if (search.trim()) {
      const q = search.toLowerCase();
      f = f.filter(
        t =>
          t.name.toLowerCase().includes(q) ||
          t.countries.some(c => c.toLowerCase().includes(q)) ||
          t.region.toLowerCase().includes(q)
      );
    }

    if (sort === "priority") f.sort((a, b) => a.priority - b.priority || a.leave - b.leave);
    else if (sort === "cost") f.sort((a, b) => a.cost - b.cost);
    else if (sort === "leave") f.sort((a, b) => a.leave - b.leave);
    else if (sort === "region") f.sort((a, b) => a.region.localeCompare(b.region) || a.priority - b.priority);
    else if (sort === "difficulty") f.sort((a, b) => (diffOrder[a.difficulty] || 9) - (diffOrder[b.difficulty] || 9));

    return f;
  }, [activeTrips, diffFilter, diffOrder, region, search, sort]);

  const stats = useMemo(() => {
    const all = activeTrips;
    const dn = all.filter(t => done.has(t.id));
    const tc = all.reduce((s, t) => s + t.countries.length, 0);
    const td = all.reduce((s, t) => s + t.days, 0);
    const tl = all.reduce((s, t) => s + t.leave, 0);
    const tco = all.reduce((s, t) => s + t.cost, 0);
    const yr = Math.ceil(tl / 32);

    return {
      tc,
      td,
      tl,
      tco,
      yr,
      dc: dn.reduce((s, t) => s + t.countries.length, 0),
      dco: dn.reduce((s, t) => s + t.cost, 0),
      dl: dn.reduce((s, t) => s + t.leave, 0),
    };
  }, [activeTrips, done]);

  const autoYearPlan = useMemo(() => {
    const s = [...activeTrips].sort((a, b) => a.priority - b.priority || a.leave - b.leave);
    const yrs = [];
    let cur = { year: 1, trips: [], leave: 0, days: 0, cost: 0 };

    for (const t of s) {
      if (cur.leave + t.leave <= 32) {
        cur.trips.push(t);
        cur.leave += t.leave;
        cur.days += t.days;
        cur.cost += t.cost;
      } else {
        if (cur.trips.length) yrs.push(cur);
        cur = { year: yrs.length + 1, trips: [t], leave: t.leave, days: t.days, cost: t.cost };
      }
    }

    if (cur.trips.length) yrs.push(cur);
    return yrs;
  }, [activeTrips]);

  const [tripYearOverrides, setTripYearOverrides] = useState(() => {
    try {
      const s = localStorage.getItem("ecp-year-overrides");
      return s ? JSON.parse(s) : {};
    } catch {
      return {};
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem("ecp-year-overrides", JSON.stringify(tripYearOverrides));
    } catch {
      // ignored
    }
  }, [tripYearOverrides]);

  const yearPlan = useMemo(() => {
    const tripToYear = {};
    autoYearPlan.forEach(y => y.trips.forEach(t => {
      tripToYear[t.id] = y.year;
    }));

    Object.entries(tripYearOverrides).forEach(([id, yr]) => {
      tripToYear[Number(id)] = yr;
    });

    const yearMap = {};
    activeTrips.forEach(t => {
      const yr = tripToYear[t.id] || 1;
      if (!yearMap[yr]) yearMap[yr] = { year: yr, trips: [], leave: 0, days: 0, cost: 0 };
      yearMap[yr].trips.push(t);
      yearMap[yr].leave += t.leave;
      yearMap[yr].days += t.days;
      yearMap[yr].cost += t.cost;
    });

    return Object.values(yearMap).sort((a, b) => a.year - b.year);
  }, [activeTrips, autoYearPlan, tripYearOverrides]);

  const totalYears = yearPlan.length > 0 ? yearPlan[yearPlan.length - 1].year : 0;

  const moveTripToYear = useCallback((tripId, newYear) => {
    setTripYearOverrides(prev => ({ ...prev, [tripId]: newYear }));
  }, []);

  const resetTimeline = useCallback(() => {
    setTripYearOverrides({});
  }, []);

  const regionStats = useMemo(
    () =>
      Object.entries(
        activeTrips.reduce((a, t) => {
          if (!a[t.region]) a[t.region] = { cost: 0, days: 0, leave: 0, countries: 0, trips: 0, done: 0 };
          a[t.region].cost += t.cost;
          a[t.region].days += t.days;
          a[t.region].leave += t.leave;
          a[t.region].countries += t.countries.length;
          a[t.region].trips += 1;
          if (done.has(t.id)) a[t.region].done += 1;
          return a;
        }, {})
      ).sort((a, b) => b[1].countries - a[1].countries),
    [activeTrips, done]
  );

  const diffStats = useMemo(
    () =>
      Object.entries(
        activeTrips.reduce((a, t) => {
          if (!a[t.difficulty]) a[t.difficulty] = 0;
          a[t.difficulty] += 1;
          return a;
        }, {})
      ).sort((a, b) => (diffOrder[a[0]] || 9) - (diffOrder[b[0]] || 9)),
    [activeTrips, diffOrder]
  );

  const priStats = useMemo(
    () =>
      Object.entries(
        activeTrips.reduce((a, t) => {
          if (!a[t.priority]) a[t.priority] = 0;
          a[t.priority] += 1;
          return a;
        }, {})
      ).sort((a, b) => Number(a[0]) - Number(b[0])),
    [activeTrips]
  );

  const toggle = useCallback(id => {
    setDone(p => {
      const n = new Set(p);
      n.has(id) ? n.delete(id) : n.add(id);
      return n;
    });
  }, []);

  const clearFilters = useCallback(() => {
    setSearch("");
    setRegion("All");
    setDiffFilter("All");
  }, []);

  const progressPct = ((visitedCountries + stats.dc) / totalCountries) * 100;

  return {
    tab,
    setTab,
    exp,
    setExp,
    sort,
    setSort,
    region,
    setRegion,
    search,
    setSearch,
    diffFilter,
    setDiffFilter,
    dark,
    setDark,
    done,
    hovered,
    setHovered,
    regions,
    difficulties,
    sorted,
    stats,
    yearPlan,
    totalYears,
    tripYearOverrides,
    moveTripToYear,
    resetTimeline,
    regionStats,
    diffStats,
    priStats,
    toggle,
    clearFilters,
    progressPct,
  };
}
