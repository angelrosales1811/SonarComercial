import { useState } from 'react';
import MapView from '../features/map/components/MapView';
import { importClients } from '../services/excelImport.service';
import { mapExcelRow } from '../utils/clientMapper';
import { clientToMapClient } from '../utils/clientToMapClient';
import { generateConvexHull } from '../utils/convexHull';
// import StatsCard from "./components/StatsCard";
// import TerritoryPanel from "./components/TerritoryPanel";
// import ClientsPanel from "./components/ClientsPanel";

export default function App() {
  const [clients, setClients] = useState([]);
  const [polygonClients, setPolygonClients] = useState(null);
  const [prospects, setProspects] = useState([]);

  function downloadTemplate() {
    const link = document.createElement('a');

    link.href = '/templates/Formato_excel_clientes.xlsx';

    link.download = 'Formato_excel_clientes.xlsx';

    document.body.appendChild(link);

    link.click();

    document.body.removeChild(link);
  }

  function clearMap() {
    setClients([]);
    setProspects([]);
    setPolygonClients(null);
  }

  function generatePolygon() {
    const hull = generateConvexHull(clients);

    if (!hull) {
      alert('Se requieren al menos 3 clientes');
      return;
    }

    setPolygonClients(hull);
  }

  async function loadData(event, setter, generateHull = false) {
    const file = event.target.files?.[0];

    if (!file) return;

    try {
      const rows = await importClients(file);

      const mappedData = rows.map(mapExcelRow).map(clientToMapClient);

      setter(mappedData);

      if (generateHull) {
        const hull = generateConvexHull(mappedData);

        if (hull) {
          setPolygonClients(hull);
        }
      }
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
        <button className="btn format-excel-btn" onClick={downloadTemplate}>
          📄 Descargar Formato Excel
        </button>
      </header>

      <section className="map-section">
        <MapView clients={clients} prospects={prospects} polygonClients={polygonClients} />
      </section>

      {/* <aside className="sidebar">
        <StatsCard />

        <TerritoryPanel />

        <ClientsPanel />
      </aside> */}

      <footer className="bottom-console">
        <label htmlFor="file" className="btn btn-secondary">
          📁 Cargar clientes
        </label>

        <input
          id="file"
          type="file"
          accept=".xlsx,.xls"
          className="file-input"
          onChange={(e) => loadData(e, setClients, true)}
        />
        <button className="btn btn-secondary" onClick={clearMap}>
          X
        </button>

        <div className="actions">
          {/* <button
            className="btn btn-primary"
            onClick={generatePolygon}
            disabled={clients.length < 3}
          >
            Generar Polígono
          </button> */}
          <label htmlFor="prospects-file" className="btn btn-primary">
            Cargar Prospectos
          </label>

          <input
            id="prospects-file"
            type="file"
            accept=".xlsx,.xls"
            className="file-input"
            onChange={(e) => loadData(e, setProspects, false)}
          />
          {/* <button
            className="btn btn-primary"
            onClick={prospectsVisible}
            disabled={clients.length < 3}
          >
            Descargar Prospectos
          </button> */}
        </div>
      </footer>
    </main>
  );
}
