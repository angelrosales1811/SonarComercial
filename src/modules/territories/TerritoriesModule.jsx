import MapView from '../map/components/MapView';
import PolygonContextMenu from './components/PolygonContextMenu';
import PolygonList from './components/PolygonList';
import PolygonModal from './components/PolygonModal';
import TerritoriesConsole from './components/TerritoriesConsole';
import './components/TerritoriesConsole.css';
import { useTerritoriesContext } from './context/TerritoriesContext';
import { TerritoriesProvider } from './context/TerritoriesProvider';
import TerritoriesDrawingLayer from './layers/TerritoriesDrawingLayer';
import TerritoriesEditingLayer from './layers/TerritoriesEditingLayer';

function TerritoriesScreen() {
  const { state, addPoint, createPolygon, closePolygonModal, updatePolygonData } =
    useTerritoriesContext();

  const editingPolygon = state.polygons.find((p) => p.id === state.polygonModal.polygonId);

  return (
    <div
      style={{
        position: 'relative',
        width: '100%',
        height: '100%',
      }}
    >
      <TerritoriesConsole />

      <PolygonList />

      <PolygonContextMenu />

      <PolygonModal
        isOpen={state.polygonModal.visible}
        mode={state.polygonModal.mode}
        onClose={closePolygonModal}
        initialName={editingPolygon?.name}
        initialColor={editingPolygon?.color}
        onSave={(data) => {
          if (state.polygonModal.mode === 'edit') {
            updatePolygonData({
              id: editingPolygon.id,
              ...data,
            });

            return;
          }

          createPolygon(data);
        }}
      />

      <div className={`territories-map ${state.isDrawing ? 'territories-map-drawing' : ''}`}>
        <MapView clients={[]} prospects={[]} polygonClients={null} onMapClick={addPoint}>
          <TerritoriesDrawingLayer polygons={state.polygons} activePolygon={state.activePolygon} />
          <TerritoriesEditingLayer />
        </MapView>
      </div>
    </div>
  );
}

export default function TerritoriesModule() {
  return (
    <TerritoriesProvider>
      <TerritoriesScreen />
    </TerritoriesProvider>
  );
}
