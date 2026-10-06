import { FiCheck, FiX } from 'react-icons/fi';
import { PiPolygon } from 'react-icons/pi';
import { useTerritoriesContext } from '../context/TerritoriesContext';
import './TerritoriesConsole.css';

export default function TerritoriesConsole() {
  const { state, openPolygonModal, removeLastPoint, closePolygon } = useTerritoriesContext();

  return (
    <footer className="bottom-console">
      <div className="console-content">
        <div className="step-wrapper">
          <button
            className="btn btn-primary"
            onClick={() => {
              openPolygonModal();
            }}
          >
            <PiPolygon />
            Crear Polígono
          </button>
        </div>

        {state.isDrawing && (
          <>
            <div className="step-wrapper">
              <button className="btn btn-secondary" onClick={removeLastPoint}>
                <FiX />
                Eliminar Punto
              </button>
            </div>

            <div className="step-wrapper">
              <button
                className="btn btn-primary"
                onClick={closePolygon}
                disabled={state.activePolygon?.points?.length < 3}
              >
                <FiCheck />
                Cerrar Polígono
              </button>
            </div>
          </>
        )}
      </div>
    </footer>
  );
}
