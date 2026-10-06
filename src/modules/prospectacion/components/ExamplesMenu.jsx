import { useRef } from 'react';
import { FiChevronDown, FiDownload, FiFileText, FiUsers } from 'react-icons/fi';
import { useProspectacionContext } from '../context/ProspectacionContext';
import { ACTIONS } from '../context/reducers/prospectacion.actions';
import { downloadTemplate } from '../services/template.service';

export default function ExamplesMenu() {
  const { state, dispatch } = useProspectacionContext();
  const { showExamplesMenu } = state;
  const menuRef = useRef(null);

  return (
    <div ref={menuRef} className="header-actions" onClick={(e) => e.stopPropagation()}>
      <div className="step-wrapper">
        <span className="step-badge">0</span>
        <button
          className="btn format-excel-btn"
          onClick={() =>
            dispatch({
              type: ACTIONS.SET_SHOW_EXAMPLES_MENU,
              payload: !showExamplesMenu,
            })
          }
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
              dispatch({
                type: ACTIONS.SET_SHOW_EXAMPLES_MENU,
                payload: false,
              });
            }}
          >
            <FiUsers />
            <span>Formato Clientes</span>
          </button>

          <button
            className="examples-menu-item"
            onClick={() => {
              downloadTemplate(2);
              dispatch({
                type: ACTIONS.SET_SHOW_EXAMPLES_MENU,
                payload: false,
              });
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
