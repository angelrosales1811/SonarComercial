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
            <button className="btn btn-primary" onClick={openPolygonModal}>
              Crear Polígono
            </button>
          )}
        </div>

        {state.isDrawing && !state.editingPolygonId && (
          <>
            <button className="btn btn-secondary" onClick={removeLastPoint}>
              Eliminar Punto
            </button>

            <button className="btn btn-primary" onClick={closePolygon}>
              Cerrar Polígono
            </button>
          </>
        )}

        {state.editingPolygonId && (
          <>
            <button className="btn btn-success" onClick={saveEditedPolygon}>
              Guardar
            </button>

            <button className="btn btn-success" onClick={savePolygonCopy}>
              Guardar como Copia
            </button>

            <button className="btn btn-danger" onClick={cancelEditPolygon}>
              Cancelar Edición
            </button>
          </>
        )}
      </div>
    </footer>
  );
}
