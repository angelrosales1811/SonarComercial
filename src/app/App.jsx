import { useEffect, useState } from 'react';
import { FiChevronDown, FiDownload, FiFileText, FiTrash2, FiUpload, FiUsers } from 'react-icons/fi';
import * as XLSX from 'xlsx';
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
  const [visibleProspects, setVisibleProspects] = useState([]);

  const [showExamplesMenu, setShowExamplesMenu] = useState(false);

  useEffect(() => {
    const handleClickOutside = () => {
      setShowExamplesMenu(false);
    };

    if (showExamplesMenu) {
      document.addEventListener('click', handleClickOutside);
    }

    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [showExamplesMenu]);

  function downloadTemplate(type) {
    const link = document.createElement('a');

    if (type === 1) {
      link.href = '/templates/Formato_excel_clientes.xlsx';
      link.download = 'Formato_excel_clientes.xlsx';
    } else {
      link.href = '/templates/Formato_excel_prospectos.xlsx';
      link.download = 'Formato_excel_prospectos.xlsx';
    }

    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

  function clearMap() {
    setClients([]);
    setProspects([]);
    setVisibleProspects([]);
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

  function prospectsVisible() {
    if (!visibleProspects.length) {
      alert('No hay prospectos para exportar');
      return;
    }

    const rows = visibleProspects.map((prospect) => ({
      id: prospect.id,

      name: prospect.name,

      lat: prospect.position[0],

      lng: prospect.position[1],

      c1: prospect.attributes?.c1 ?? '',

      c2: prospect.attributes?.c2 ?? '',

      c3: prospect.attributes?.c3 ?? '',

      c4: prospect.attributes?.c4 ?? '',

      c5: prospect.attributes?.c5 ?? '',

      c6: prospect.attributes?.c6 ?? '',
    }));

    const worksheet = XLSX.utils.json_to_sheet(rows);

    const workbook = XLSX.utils.book_new();

    XLSX.utils.book_append_sheet(workbook, worksheet, 'Prospectos');

    XLSX.writeFile(workbook, 'Prospectos_Visibles.xlsx');
  }

  return (
    <main className="layout">
      <header className="app-header">
        <div>
          <span className="badge">ECHOGEOLOCALIZACION COMERCIAL</span>
          <h1>SONAR COMERCIAL</h1>
        </div>

        <div className="header-actions" onClick={(e) => e.stopPropagation()}>
          <button
            className="btn format-excel-btn"
            onClick={() => setShowExamplesMenu(!showExamplesMenu)}
          >
            <span className="step-badge">0</span>
            <FiDownload />
            <span>Ejemplos</span>
            <FiChevronDown className={showExamplesMenu ? 'rotate' : ''} />
          </button>

          {showExamplesMenu && (
            <div className="examples-menu">
              <div className="context-menu-header">FORMATOS</div>

              <button
                className="examples-menu-item"
                onClick={() => {
                  downloadTemplate(1);
                  setShowExamplesMenu(false);
                }}
              >
                <FiUsers />
                <span>Formato Clientes</span>
              </button>

              <button
                className="examples-menu-item"
                onClick={() => {
                  downloadTemplate(2);
                  setShowExamplesMenu(false);
                }}
              >
                <FiFileText />
                <span>Formato Prospectos</span>
              </button>
            </div>
          )}
        </div>
      </header>
      <section className="map-section">
        <MapView
          clients={clients}
          prospects={prospects}
          polygonClients={polygonClients}
          onVisibleProspectsChange={setVisibleProspects}
        />
      </section>

      {/* <aside className="sidebar">
        <StatsCard />

        <TerritoryPanel />

        <ClientsPanel />
      </aside> */}

      <footer className="bottom-console">
        <label htmlFor="file" className="btn btn-secondary">
          <span className="step-badge">1</span>
          <FiUpload /> Clientes
        </label>

        <input
          id="file"
          type="file"
          accept=".xlsx,.xls"
          className="file-input"
          onChange={(e) => loadData(e, setClients, true)}
        />
        <button className="btn btn-secondary" onClick={clearMap}>
          <FiTrash2 />
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
            <span className="step-badge">2</span>
            <FiUpload /> Prospectos
          </label>

          <input
            id="prospects-file"
            type="file"
            accept=".xlsx,.xls"
            className="file-input"
            onChange={(e) => loadData(e, setProspects, false)}
          />

          {visibleProspects.length > 0 && (
            <button className="btn btn-primary" onClick={prospectsVisible}>
              <span className="step-badge">3</span>
              <FiDownload />
              <span>Prospectos ({visibleProspects.length})</span>
            </button>
          )}
        </div>
      </footer>
    </main>
  );
}
