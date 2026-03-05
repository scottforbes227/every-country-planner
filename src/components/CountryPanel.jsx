export default function CountryPanel({
  trip,
  exp,
  setExp,
  done,
  hovered,
  setHovered,
  dark,
  toggle,
  T,
  S,
  REGION_COLORS,
  DIFF_COL,
  PRI_LABELS,
}) {
  const isExp = exp === trip.id;
  const isDone = done.has(trip.id);
  const isHovered = hovered === trip.id;
  const acc = REGION_COLORS[trip.region]?.accent || "#888";

  return (
    <div
      className="trip-card"
      style={{
        background: isDone ? (dark ? "rgba(39,174,96,0.08)" : "rgba(39,174,96,0.05)") : T.cardBg,
        border: `1px solid ${isDone ? "rgba(39,174,96,0.2)" : isHovered ? `${acc}40` : T.border}`,
        borderRadius: 8,
        overflow: "hidden",
        opacity: isDone ? 0.6 : 1,
        boxShadow: isHovered ? `0 4px 12px rgba(0,0,0,${dark ? "0.3" : "0.08"})` : "0 1px 2px rgba(0,0,0,0.02)",
      }}
      onMouseEnter={() => setHovered(trip.id)}
      onMouseLeave={() => setHovered(null)}
    >
      <div
        onClick={() => setExp(isExp ? null : trip.id)}
        style={{
          padding: "12px 14px",
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          gap: 10,
        }}
      >
        <div style={{ width: 4, height: 34, borderRadius: 2, background: acc, flexShrink: 0, transition: "height 0.2s" }} />
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 6, flexWrap: "wrap" }}>
            <span style={{ fontWeight: 600, fontSize: 14, color: dark ? "#e8e8e8" : "#1a1a2e" }}>{trip.name}</span>
            <span style={{ fontSize: 9, padding: "2px 5px", borderRadius: 3, background: `${DIFF_COL[trip.difficulty]}18`, color: DIFF_COL[trip.difficulty], ...S.mono }}>
              {trip.difficulty}
            </span>
            <span style={{ fontSize: 9, padding: "2px 5px", borderRadius: 3, background: dark ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.03)", color: T.textMuted, ...S.mono }}>
              {PRI_LABELS[trip.priority]}
            </span>
            {isDone && (
              <span style={{ fontSize: 9, padding: "2px 5px", borderRadius: 3, background: "rgba(39,174,96,0.12)", color: "#27ae60", ...S.mono }}>
                ✓ Done
              </span>
            )}
          </div>
          <div style={{ fontSize: 11.5, color: T.textSoft, marginTop: 3 }}>{trip.countries.join(" · ")}</div>
        </div>
        <div style={{ display: "flex", gap: 12, flexShrink: 0, alignItems: "center" }}>
          <div className="trip-stats-inline" style={{ textAlign: "center" }}>
            <div style={{ fontSize: 14, fontWeight: 700, color: "#e94560" }}>{trip.leave}d</div>
            <div style={{ fontSize: 9, color: T.textMuted, ...S.mono }}>LEAVE</div>
          </div>
          <div className="trip-stats-inline" style={{ textAlign: "center" }}>
            <div style={{ fontSize: 14, fontWeight: 600, color: dark ? "#e8e8e8" : "#1a1a2e" }}>{trip.days}d</div>
            <div style={{ fontSize: 9, color: T.textMuted, ...S.mono }}>TOTAL</div>
          </div>
          <div className="trip-cost-inline" style={{ textAlign: "right", minWidth: 50 }}>
            <div style={{ fontSize: 13, fontWeight: 600, color: dark ? "#e8e8e8" : "#1a1a2e" }}>£{trip.cost.toLocaleString()}</div>
          </div>
          <span style={{ color: T.textMuted, fontSize: 14, transform: isExp ? "rotate(180deg)" : "", transition: "transform 0.2s ease" }}>▾</span>
        </div>
      </div>

      {isExp && (
        <div className="expand-content" style={{ padding: "0 14px 14px 28px", borderTop: `1px solid ${T.border}` }}>
          <div style={{ paddingTop: 10, display: "grid", gap: 8 }}>
            <div>
              <div style={S.lbl}>ROUTE</div>
              <div style={{ fontSize: 13, color: dark ? "#bbb" : "#444", lineHeight: 1.5 }}>{trip.route}</div>
            </div>
            <div>
              <div style={S.lbl}>NOTES</div>
              <div style={{ fontSize: 13, color: dark ? "#aaa" : "#555", lineHeight: 1.6 }}>{trip.notes}</div>
            </div>
            {trip.bhTip && trip.bhTip !== "—" && (
              <div style={{ background: dark ? "rgba(233,69,96,0.08)" : "rgba(233,69,96,0.04)", border: "1px solid rgba(233,69,96,0.15)", borderRadius: 6, padding: "8px 10px" }}>
                <div style={{ ...S.lbl, color: "#e94560", marginBottom: 2 }}>💡 BANK HOLIDAY TIP</div>
                <div style={{ fontSize: 12.5, color: dark ? "#bbb" : "#555" }}>{trip.bhTip}</div>
              </div>
            )}
            <div style={{ display: "flex", gap: 18, flexWrap: "wrap" }}>
              {[
                ["LEAVE DAYS", `${trip.leave} of 32`],
                ["TOTAL DAYS", trip.days],
                ["FREE DAYS", trip.days - trip.leave],
                ["BEST MONTHS", trip.months],
                ["£/LEAVE DAY", trip.leave > 0 ? `£${Math.round(trip.cost / trip.leave)}` : "free"],
              ].map(([l, v], i) => (
                <div key={i}>
                  <div style={S.lbl}>{l}</div>
                  <div style={{ fontSize: 13, color: dark ? "#ccc" : "#444" }}>{v}</div>
                </div>
              ))}
            </div>
            <div style={{ marginTop: 4 }}>
              <div style={S.lbl}>COST BREAKDOWN</div>
              <div style={{ display: "flex", gap: 4, alignItems: "center", marginTop: 4 }}>
                <div style={{ height: 8, borderRadius: 4, background: acc, width: `${Math.min(trip.cost / 100, 100)}%`, minWidth: 4, transition: "width 0.3s ease" }} />
                <span style={{ ...S.mono, fontSize: 10, color: T.textMuted }}>£{trip.cost.toLocaleString()}</span>
              </div>
            </div>
            <button
              onClick={e => {
                e.stopPropagation();
                toggle(trip.id);
              }}
              style={{
                marginTop: 4,
                padding: "8px 16px",
                borderRadius: 6,
                border: `1px solid ${isDone ? "#27ae60" : T.border}`,
                background: isDone ? "rgba(39,174,96,0.1)" : dark ? "#222" : "#f5f4f0",
                color: isDone ? "#27ae60" : T.textSoft,
                fontSize: 12,
                cursor: "pointer",
                width: "fit-content",
                transition: "all 0.2s ease",
              }}
            >
              {isDone ? "✓ Completed — click to undo" : "Mark Complete"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
