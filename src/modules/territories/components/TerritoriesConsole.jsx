import { FiCheck, FiCopy, FiPlus, FiSave, FiTrash2, FiXCircle } from 'react-icons/fi';
import { useTerritoriesContext } from '../context/TerritoriesContext';
import './TerritoriesConsole.css';

export default function TerritoriesConsole() {
  const {
    state,
    openPolygonModal,
    removeLastPoint,
    closePolygon,

    saveEditedPolygon,
    savePolygonCopy,
    cancelEditPolygon,
  } = useTerritoriesContext();

  return (
    <footer className="bottom-console">
      <div className="console-content">
        <div className="step-wrapper">
          {!state.editingPolygonId && !state.isDrawing && (
            <button className="btn btn-primary" onClick={openPolygonModal} title="Crear Polígono">
              <FiPlus size={20} />
            </button>
          )}
        </div>

        {state.isDrawing && !state.editingPolygonId && (
          <>
            <button className="btn btn-danger" onClick={removeLastPoint} title="Eliminar Punto">
              <FiTrash2 size={20} />
            </button>

            <button className="btn btn-success" onClick={closePolygon} title="Cerrar Polígono">
              <FiCheck size={20} />
            </button>
          </>
        )}

        {state.editingPolygonId && (
          <>
            <button className="btn btn-success" onClick={saveEditedPolygon} title="Guardar">
              <FiSave size={20} />
            </button>

            <button
              className="btn btn-success"
              onClick={savePolygonCopy}
              title="Guardar como Copia"
            >
              <FiCopy size={20} />
            </button>

            <button className="btn btn-danger" onClick={cancelEditPolygon} title="Cancelar Edición">
              <FiXCircle size={20} />
            </button>
          </>
        )}
      </div>
    </footer>
  );
}
