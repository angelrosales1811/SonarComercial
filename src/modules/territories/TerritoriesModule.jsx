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
  const { state, addPoint, createPolygon, closePolygonModal } = useTerritoriesContext();

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
        isOpen={state.showPolygonModal}
        onClose={closePolygonModal}
        onSave={createPolygon}
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
