import {
  FiCheck,
  FiCopy,
  FiDownload,
  FiPlus,
  FiSave,
  FiTrash2,
  FiUpload,
  FiXCircle,
} from 'react-icons/fi';

import { useRef } from 'react';
import { useTerritoriesContext } from '../context/TerritoriesContext';
import './TerritoriesConsole.css';

export default function TerritoriesConsole() {
  const {
    state,
    openPolygonModal,
    removeLastPoint,
    closePolygon,

    exportAllPolygonsKml,
    importPolygonsKml,

    saveEditedPolygon,
    savePolygonCopy,
    cancelEditPolygon,
  } = useTerritoriesContext();

  const fileInputRef = useRef(null);

  const handleImport = (event) => {
    const file = event.target.files?.[0];

    if (!file) {
      return;
    }

    importPolygonsKml(file);

    event.target.value = '';
  };

  return (
    <>
      <input
        ref={fileInputRef}
        type="file"
        accept=".kml"
        style={{ display: 'none' }}
        onChange={handleImport}
      />
      ;
      <footer className="bottom-console">
        <div className="console-content">
          <div className="step-wrapper">
            {!state.editingPolygonId && !state.isDrawing && (
              <>
                <button
                  className="btn btn-primary"
                  onClick={openPolygonModal}
                  title="Crear Polígono"
                >
                  <FiPlus size={20} />
                </button>

                <button
                  className="btn btn-primary"
                  title="Importar Polígonos"
                  onClick={() => fileInputRef.current?.click()}
                >
                  <FiDownload size={20} />
                </button>

                {state.polygons.length > 1 && (
                  <button
                    className="btn btn-primary"
                    onClick={exportAllPolygonsKml}
                    title={`Exportar KML (${state.polygons.length})`}
                  >
                    <FiUpload size={20} />
                  </button>
                )}
              </>
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

              <button
                className="btn btn-danger"
                onClick={cancelEditPolygon}
                title="Cancelar Edición"
              >
                <FiXCircle size={20} />
              </button>
            </>
          )}
        </div>
      </footer>
    </>
  );
}
