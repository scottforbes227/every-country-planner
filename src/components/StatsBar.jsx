function ProgressRing({ radius, stroke, progress, color, trackColor }) {
  const normalizedRadius = radius - stroke;
  const circumference = normalizedRadius * 2 * Math.PI;
  const strokeDashoffset = circumference - (progress / 100) * circumference;

  return (
    <svg height={radius * 2} width={radius * 2} style={{ transform: "rotate(-90deg)" }}>
      <circle
        stroke={trackColor || "rgba(255,255,255,0.08)"}
        fill="transparent"
        strokeWidth={stroke}
        r={normalizedRadius}
        cx={radius}
        cy={radius}
      />
      <circle
        stroke={color}
        fill="transparent"
        strokeWidth={stroke}
        strokeDasharray={`${circumference} ${circumference}`}
        style={{ strokeDashoffset, transition: "stroke-dashoffset 0.8s ease-in-out", strokeLinecap: "round" }}
        r={normalizedRadius}
        cx={radius}
        cy={radius}
      />
    </svg>
  );
}

export default function StatsBar({
  T,
  S,
  dark,
  setDark,
  stats,
  activeTripsCount,
  done,
  visitedCountries,
  totalCountries,
  progressPct,
}) {
  return (
    <div style={{ background: T.headerBg, padding: "28px 24px 22px", position: "relative", borderBottom: dark ? "none" : "1px solid rgba(0,0,0,0.06)" }}>
      <div style={{ maxWidth: 960, margin: "0 auto" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: 12 }}>
          <div style={{ minWidth: 0 }}>
            <div style={{ ...S.mono, fontSize: 11, color: "#e94560", letterSpacing: 3, textTransform: "uppercase", marginBottom: 6 }}>Every Country Project</div>
            <h1 style={{ fontSize: "clamp(18px, 4vw, 26px)", fontWeight: 700, margin: 0, color: T.headerText }}>{stats.tc} Countries · {activeTripsCount} Trips</h1>
            <div style={{ fontSize: 13, color: T.headerSoft, marginTop: 6 }}>London · 32 days leave/year · {visitedCountries} done · weekends + bank holidays = free travel days</div>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <div style={{ position: "relative", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <ProgressRing radius={36} stroke={5} progress={progressPct} color="#e94560" trackColor={T.ringTrack} />
              <div style={{ position: "absolute", textAlign: "center" }}>
                <div style={{ fontSize: 13, fontWeight: 700, color: T.headerText }}>{Math.round(progressPct)}%</div>
                <div style={{ fontSize: 7, color: T.headerStatLabel, ...S.mono }}>DONE</div>
              </div>
            </div>

            <button
              className="dark-toggle"
              onClick={() => setDark(d => !d)}
              style={{
                background: dark ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.05)",
                border: `1px solid ${dark ? "rgba(255,255,255,0.12)" : "rgba(0,0,0,0.1)"}`,
                borderRadius: 8,
                padding: "7px 10px",
                cursor: "pointer",
                lineHeight: 1,
                color: T.headerText,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
              title={dark ? "Switch to light mode" : "Switch to dark mode"}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                {dark ? (
                  <>
                    <circle cx="12" cy="12" r="5" />
                    <line x1="12" y1="1" x2="12" y2="3" />
                    <line x1="12" y1="21" x2="12" y2="23" />
                    <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
                    <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
                    <line x1="1" y1="12" x2="3" y2="12" />
                    <line x1="21" y1="12" x2="23" y2="12" />
                    <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
                    <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
                  </>
                ) : (
                  <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
                )}
              </svg>
            </button>
          </div>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(140px, 1fr))", gap: 10, marginTop: 18 }}>
          {[
            { l: "TRIPS", v: activeTripsCount, s: `${activeTripsCount - done.size} left`, icon: "✈️" },
            { l: "LEAVE DAYS", v: stats.tl, s: `~${stats.yr} yrs at 32/yr`, icon: "📅" },
            { l: "TOTAL DAYS", v: stats.td, s: `${stats.td - stats.tl} are free weekends`, icon: "🌍" },
            { l: "EST. COST", v: `£${(stats.tco / 1000).toFixed(0)}k`, s: `£${((stats.tco - stats.dco) / 1000).toFixed(0)}k left`, icon: "💷" },
            { l: "PROGRESS", v: `${visitedCountries + stats.dc}/${totalCountries}`, s: `${Math.round(progressPct)}% complete`, icon: "📊" },
          ].map((s, i) => (
            <div key={i} className="stat-card" style={{ background: T.headerStatBg, border: `1px solid ${T.headerStatBorder}`, borderRadius: 8, padding: "10px 12px", cursor: "default" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <div style={{ ...S.mono, fontSize: 9, color: T.headerStatLabel, letterSpacing: 2 }}>{s.l}</div>
                <span style={{ fontSize: 14 }}>{s.icon}</span>
              </div>
              <div style={{ fontSize: 20, fontWeight: 700, color: T.headerStatValue, marginTop: 2 }}>{s.v}</div>
              <div style={{ fontSize: 10, color: T.headerStatSub, marginTop: 1 }}>{s.s}</div>
            </div>
          ))}
        </div>

        <div style={{ marginTop: 14 }}>
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 4 }}>
            <span style={{ ...S.mono, fontSize: 9, color: T.headerBarLabel, letterSpacing: 1 }}>WORLD PROGRESS</span>
            <span style={{ ...S.mono, fontSize: 9, color: T.headerBarLabel }}>{visitedCountries + stats.dc} / {totalCountries} countries</span>
          </div>
          <div style={{ height: 6, background: T.headerBarBg, borderRadius: 3, overflow: "hidden" }}>
            <div
              style={{
                height: "100%",
                borderRadius: 3,
                transition: "width 0.8s ease-in-out",
                width: `${progressPct}%`,
                background: "linear-gradient(90deg, #e94560, #f39c12, #27ae60)",
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
