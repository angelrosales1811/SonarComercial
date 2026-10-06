import { FiTrash2 } from 'react-icons/fi';
import { useTerritoriesContext } from '../context/TerritoriesContext';

export default function PolygonContextMenu() {
  const { state, hideContextMenu, deletePolygon } = useTerritoriesContext();

  if (!state.contextMenu.visible) {
    return null;
  }

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
        <button onClick={() => deletePolygon(state.contextMenu.polygonId)}>
          <FiTrash2 />
          Eliminar Polígono
        </button>
      </div>
    </>
  );
}
