import { useState } from 'react';
import MapView from '../features/map/components/MapView';
import { importClients } from '../services/excelImport.service';
import { mapExcelRow } from '../utils/clientMapper';
import { clientToMapClient } from '../utils/clientToMapClient';

// import StatsCard from "./components/StatsCard";
// import TerritoryPanel from "./components/TerritoryPanel";
// import ClientsPanel from "./components/ClientsPanel";

export default function App() {
  const [clients, setClients] = useState([]);

  async function handleFileChange(event) {
    const file = event.target.files?.[0];
    if (!file) return;

    try {
      const rows = await importClients(file);

      const mappedClients = rows.map(mapExcelRow).map(clientToMapClient);

      setClients(mappedClients);

      console.log('Clientes cargados:', mappedClients);
    } catch (error) {
      console.error(error);
    }
  }

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
        <MapView clients={clients} />
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

        <input
          id="file"
          type="file"
          accept=".xlsx,.xls"
          className="file-input"
          onChange={handleFileChange}
        />

        <div className="actions">
          <button className="btn btn-primary">Generar Polígono</button>
          <button className="btn btn-primary">Descargar Excel</button>
        </div>
      </footer>
    </main>
  );
}
