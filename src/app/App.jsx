import { useState } from 'react';
import MainLayout from '../components/layout/MainLayout';
import ProspectacionModule from '../modules/prospectacion/ProspectacionModule';
import { ComingSoon, Deprecated, Maintenance, NotFound } from '../system-pages';

export default function App() {
  const [selectedTool, setSelectedTool] = useState('map');

  const views = {
    map: <ProspectacionModule />,
    territories: <ComingSoon moduleName="Territorios" />,
    reports: <ComingSoon moduleName="Reportes" />,
    coverage: <ComingSoon moduleName="Cobertura" />,
    analytics: <ComingSoon moduleName="Analítica" />,

    maintenance: <Maintenance />,
    deprecated: <Deprecated />,
  };
  return (
    <MainLayout selectedTool={selectedTool} onSelectTool={setSelectedTool}>
      {views[selectedTool] ?? <NotFound />}
    </MainLayout>
  );
}

// <MainLayout selectedTool={selectedTool} onSelectTool={setSelectedTool}>
//   {selectedTool === 'map' && (
//     <ProspectacionModule
//       showExamplesMenu={showExamplesMenu}
//       setShowExamplesMenu={setShowExamplesMenu}
//       menuRef={menuRef}
//     />
//   )}
//    {views[selectedTool] ?? <NotFound />}
// </MainLayout>

// return (
//   <main className="layout">
//     <header className="app-header">
//       <div>
//         <span className="badge">ECHOGEOLOCALIZACION COMERCIAL</span>
//         <h1>SONAR COMERCIAL</h1>
//       </div>

//     <section className="map-section">
//       <MapView
//         clients={clients}
//         prospects={prospects}
//         polygonClients={polygonClients}
//         onVisibleProspectsChange={setVisibleProspects}
//         onProspectModeChange={setProspectMode}
//       />
//     </section>

//     {/* <aside className="sidebar">
//       <StatsCard />

//       <TerritoryPanel />

//       <ClientsPanel />
//     </aside> */}

//   <footer className="bottom-console">
//     <div className="step-wrapper">
//       <span className="step-badge">1</span>

//       <label htmlFor="file" className="btn btn-secondary">
//         <FiUpload />
//         Clientes
//       </label>
//     </div>

//     <input
//       id="file"
//       type="file"
//       accept=".xlsx,.xls"
//       className="file-input"
//       onChange={(e) => loadData(e, setClients, true)}
//     />
//     <button className="btn btn-secondary" onClick={clearMap}>
//       <FiTrash2 />
//     </button>

//     <div className="actions">
//       {/* <button
//         className="btn btn-primary"
//         onClick={generatePolygon}
//         disabled={clients.length < 3}
//       >
//         Generar Polígono
//       </button> */}
//       <div className="step-wrapper">
//         <span className="step-badge">2</span>

//         <label htmlFor="prospects-file" className="btn btn-primary">
//           <FiUpload />
//           Prospectos
//         </label>
//       </div>

//       <input
//         id="prospects-file"
//         type="file"
//         accept=".xlsx,.xls"
//         className="file-input"
//         onChange={(e) => loadData(e, setProspects, false)}
//       />

//       {visibleProspects.length > 0 && (
//         <div className="step-wrapper">
//           <span className="step-badge">3</span>
//           <button className="btn btn-primary" onClick={prospectsVisible}>
//             <FiDownload />
//             <span>
//               {prospectMode === 'CAPTABLES'
//                 ? `Captables (${visibleProspects.length})`
//                 : `Prospectos (${visibleProspects.length})`}
//             </span>
//           </button>
//         </div>
//       )}
//     </div>
//   </footer>
// </main>
// );
