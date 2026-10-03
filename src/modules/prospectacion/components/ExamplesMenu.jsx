import { FiChevronDown, FiDownload, FiFileText, FiUsers } from 'react-icons/fi';
//import { downloadTemplate } from '../services/template.service';
import { useProspectacionContext } from '../context/ProspectacionContext';

export default function ExamplesMenu() {
  const { showExamplesMenu, setShowExamplesMenu, downloadTemplate, menuRef } =
    useProspectacionContext();

  return (
    <div ref={menuRef} className="header-actions" onClick={(e) => e.stopPropagation()}>
      <div className="step-wrapper">
        <span className="step-badge">0</span>
        <button
          className="btn format-excel-btn"
          onClick={() => setShowExamplesMenu(!showExamplesMenu)}
        >
          <FiDownload />
          <span>Ejemplos</span>
          <FiChevronDown className={showExamplesMenu ? 'rotate' : ''} />
        </button>
      </div>
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
  );
}
