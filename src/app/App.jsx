import MapView from '../features/map/components/MapView';
// import StatsCard from "./components/StatsCard";
// import TerritoryPanel from "./components/TerritoryPanel";
// import ClientsPanel from "./components/ClientsPanel";

export default function App() {
  return (
    <main className="layout">
      <header className="app-header">
        <div>
          <span className="badge">Echogeolocalizacion Comercial</span>
          <h1>SONAR COMERCIAL</h1>
        </div>
        <button className="btn format-excel-btn">Formato Excel</button>
      </header>

      <section className="map-section">
        <MapView />
      </section>

      {/* <aside className="sidebar">
        <StatsCard />

        <TerritoryPanel />

        <ClientsPanel />
      </aside> */}

      <footer className="bottom-console">
        <label htmlFor="file" className="btn btn-primary">
          📁 Seleccionar archivo
        </label>

        <input id="file" type="file" className="file-input" />

        <div className="actions">
          <button className="btn btn-primary">Generar Polígono</button>
          <button className="btn btn-primary">Descargar Excel</button>
        </div>
      </footer>
    </main>
  );
}
