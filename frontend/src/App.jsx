import Header from "./components/Header";

export default function App() {
  return (
    <div className="app-shell bg-base text-primary">
      <div className="app-grid">
        <Header />
        <section className="shell-stats bg-surface border-border">
          <span className="mono text-muted">StatsBar</span>
        </section>
        <main className="shell-map bg-elevated">
          <span className="mono text-muted">Map</span>
        </main>
      </div>
    </div>
  );
}
