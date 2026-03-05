export default function Settings({
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
  T,
  S,
}) {
  return (
    <>
      <div style={{ marginBottom: 12 }}>
        <input
          className="search-input"
          type="text"
          placeholder="🔍 Search trips, countries, or regions…"
          value={search}
          onChange={e => setSearch(e.target.value)}
          style={{
            width: "100%",
            padding: "10px 14px",
            borderRadius: 8,
            fontSize: 13,
            border: `1px solid ${T.border}`,
            background: T.inputBg,
            color: T.inputText,
            boxSizing: "border-box",
            transition: "border-color 0.2s ease, box-shadow 0.2s ease",
          }}
        />
      </div>

      <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 14, alignItems: "center" }}>
        <span style={{ ...S.mono, fontSize: 10, color: T.textMuted, letterSpacing: 1 }}>SORT</span>
        {["priority", "cost", "leave", "region", "difficulty"].map(s => (
          <button
            key={s}
            className="sort-btn"
            onClick={() => setSort(s)}
            style={{
              padding: "3px 9px",
              borderRadius: 4,
              border: `1px solid ${sort === s ? "#e94560" : T.border}`,
              background: sort === s ? T.filterActiveBg : T.filterBg,
              color: sort === s ? "#e94560" : T.textSoft,
              fontSize: 11,
              cursor: "pointer",
            }}
          >
            {s}
          </button>
        ))}

        <span style={{ ...S.mono, fontSize: 10, color: T.textMuted, letterSpacing: 1, marginLeft: 10 }}>REGION</span>
        <select
          value={region}
          onChange={e => setRegion(e.target.value)}
          style={{
            padding: "3px 8px",
            borderRadius: 4,
            border: `1px solid ${T.border}`,
            background: T.filterBg,
            color: T.inputText,
            fontSize: 11,
          }}
        >
          {regions.map(r => (
            <option key={r}>{r}</option>
          ))}
        </select>

        <span style={{ ...S.mono, fontSize: 10, color: T.textMuted, letterSpacing: 1, marginLeft: 10 }}>DIFFICULTY</span>
        <select
          value={diffFilter}
          onChange={e => setDiffFilter(e.target.value)}
          style={{
            padding: "3px 8px",
            borderRadius: 4,
            border: `1px solid ${T.border}`,
            background: T.filterBg,
            color: T.inputText,
            fontSize: 11,
          }}
        >
          {difficulties.map(d => (
            <option key={d}>{d}</option>
          ))}
        </select>
      </div>
    </>
  );
}
