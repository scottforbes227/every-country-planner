import CountryPanel from "./CountryPanel";
import Settings from "./Settings";

export default function Map({
  search,
  setSearch,
  sort,
  setSort,
  region,
  setRegion,
  regions,
  diffFilter,
  setDiffFilter,
  difficulties,
  sorted,
  done,
  exp,
  setExp,
  hovered,
  setHovered,
  dark,
  clearFilters,
  toggle,
  T,
  S,
  REGION_COLORS,
  DIFF_COL,
  PRI_LABELS,
}) {
  return (
    <div style={{ paddingTop: 14, paddingBottom: 40 }}>
      <Settings
        search={search}
        setSearch={setSearch}
        sort={sort}
        setSort={setSort}
        region={region}
        setRegion={setRegion}
        regions={regions}
        diffFilter={diffFilter}
        setDiffFilter={setDiffFilter}
        difficulties={difficulties}
        T={T}
        S={S}
      />

      <div style={{ ...S.mono, fontSize: 10, color: T.textMuted, marginBottom: 8, letterSpacing: 1 }}>
        {sorted.length} TRIP{sorted.length !== 1 ? "S" : ""} · {sorted.reduce((s, t) => s + t.countries.length, 0)} COUNTRIES
        {done.size > 0 && <span style={{ marginLeft: 8, color: "#27ae60" }}>✓ {done.size} COMPLETED</span>}
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 5 }}>
        {sorted.map(trip => (
          <CountryPanel
            key={trip.id}
            trip={trip}
            exp={exp}
            setExp={setExp}
            done={done}
            hovered={hovered}
            setHovered={setHovered}
            dark={dark}
            toggle={toggle}
            T={T}
            S={S}
            REGION_COLORS={REGION_COLORS}
            DIFF_COL={DIFF_COL}
            PRI_LABELS={PRI_LABELS}
          />
        ))}

        {sorted.length === 0 && (
          <div style={{ textAlign: "center", padding: 40, color: T.textSoft }}>
            <div style={{ fontSize: 32, marginBottom: 8 }}>🔍</div>
            <div style={{ fontSize: 14 }}>No trips match your filters</div>
            <button
              onClick={clearFilters}
              style={{
                marginTop: 12,
                padding: "6px 14px",
                borderRadius: 6,
                border: `1px solid ${T.border}`,
                background: T.cardBg,
                color: T.textSoft,
                fontSize: 12,
                cursor: "pointer",
              }}
            >
              Clear filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
