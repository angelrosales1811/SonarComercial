import { FiDownload, FiTrash2, FiUpload } from 'react-icons/fi';
import { useProspectacionContext } from '../context/ProspectacionContext';

export default function ProspectionConsole() {
  const {
    setClients,
    setProspects,
    visibleProspects,
    prospectMode,
    loadData,
    clearMap,
    exportVisibleProspects,
  } = useProspectacionContext();

  return (
    <footer className="bottom-console">
      <div className="step-wrapper">
        <span className="step-badge">1</span>

        <label htmlFor="file" className="btn btn-secondary">
          <FiUpload />
          Clientes
        </label>
      </div>

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
        <div className="step-wrapper">
          <span className="step-badge">2</span>

          <label htmlFor="prospects-file" className="btn btn-primary">
            <FiUpload />
            Prospectos
          </label>
        </div>

        <input
          id="prospects-file"
          type="file"
          accept=".xlsx,.xls"
          className="file-input"
          onChange={(e) => loadData(e, setProspects, false)}
        />

        {visibleProspects?.length > 0 && (
          <div className="step-wrapper">
            <span className="step-badge">3</span>

            <button className="btn btn-primary" onClick={exportVisibleProspects}>
              <FiDownload />

              <span>
                {prospectMode === 'CAPTABLES'
                  ? `Captables (${visibleProspects?.length ?? 0})`
                  : `Prospectos (${visibleProspects?.length ?? 0})`}
              </span>
            </button>
          </div>
        )}
      </div>
    </footer>
  );
}
