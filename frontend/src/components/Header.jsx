import { Settings } from "lucide-react";

export default function Header() {
  const handleLogoClick = () => {
    window.dispatchEvent(new CustomEvent("ew:reset-zoom"));
    console.log("🌍 ew:reset-zoom event fired");
  };

  const handleSettingsClick = () => {
    window.dispatchEvent(new CustomEvent("ew:open-settings"));
    console.log("⚙️  ew:open-settings event fired");
  };

  return (
    <header
      className="shell-header"
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        height: "48px",
        background: "rgba(19, 19, 26, 0.85)",
        backdropFilter: "blur(12px)",
        borderBottom: "1px solid var(--border)",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        paddingLeft: "16px",
        paddingRight: "16px",
        paddingTop: "env(safe-area-inset-top)",
        zIndex: 10,
      }}
    >
      {/* Left side: Logo + Wordmark */}
      <button
        onClick={handleLogoClick}
        style={{
          background: "none",
          border: "none",
          display: "flex",
          alignItems: "center",
          gap: "8px",
          cursor: "pointer",
          padding: "8px",
          margin: "-8px",
        }}
      >
        <span style={{ fontSize: "20px" }}>🌍</span>
        <span
          style={{
            fontSize: "15px",
            fontWeight: 600,
            color: "var(--text-primary)",
          }}
        >
          everywhere.works
        </span>
      </button>

      {/* Right side: Settings button */}
      <button
        onClick={handleSettingsClick}
        style={{
          background: "none",
          border: "none",
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          width: "44px",
          height: "44px",
          color: "var(--text-primary)",
        }}
        aria-label="Settings"
      >
        <Settings size={20} />
      </button>
    </header>
  );
}
