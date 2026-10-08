import { FiDownload, FiEdit, FiMap, FiTrash2 } from 'react-icons/fi';
import { useTerritoriesContext } from '../context/TerritoriesContext';

export default function PolygonContextMenu() {
  const {
    state,
    hideContextMenu,
    deletePolygon,
    exportPolygonKml,
    exportPolygonExcel,
    startEditPolygon,
  } = useTerritoriesContext();
  if (!state.contextMenu.visible) {
    return null;
  }

  const polygonId = state.contextMenu.polygonId;

  return (
    <>
      <div className="context-menu-overlay" onClick={hideContextMenu} />

      <div
        className="polygon-context-menu"
        style={{
          left: state.contextMenu.x,
          top: state.contextMenu.y,
        }}
      >
        <button onClick={() => startEditPolygon(polygonId)}>
          <FiEdit />
          Editar
        </button>
        <button onClick={() => exportPolygonKml(polygonId)}>
          <FiMap />
          Descargar KML
        </button>
         
        <button onClick={() => exportPolygonExcel(polygonId)}>
          <FiDownload />
          Descargar Excel Vértices
        </button>
        <button onClick={() => deletePolygon(state.contextMenu.polygonId)}>
          <FiTrash2 />
          Eliminar Polígono
        </button>
      </div>
    </>
  );
}
