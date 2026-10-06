import './TerritoriesConsole.css';

import { useTerritoriesContext } from '../context/TerritoriesContext';

export default function TerritoriesConsole() {
  const { state, openPolygonModal, removeLastPoint, closePolygon, deleteCurrentPolygon } =
    useTerritoriesContext();

  return (
    <div className="territories-console">
      <button
        onClick={() => {
          console.log('ABRIR MODAL');
          openPolygonModal();
        }}
      >
        Crear Polígono
      </button>

      {state.isDrawing && (
        <>
          <button onClick={removeLastPoint}>Eliminar Punto</button>

          <button onClick={closePolygon} disabled={state.activePolygon?.points?.length < 3}>
            Cerrar Polígono
          </button>

          <button onClick={deleteCurrentPolygon}>Eliminar Polígono</button>
        </>
      )}
    </div>
  );
}
