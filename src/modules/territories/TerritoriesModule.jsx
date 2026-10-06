import MapView from '../map/components/MapView';

import PolygonModal from './components/PolygonModal';

import TerritoriesConsole from './components/TerritoriesConsole';

import TerritoriesDrawingLayer from './layers/TerritoriesDrawingLayer';

import { TerritoriesProvider } from './context/TerritoriesProvider';

import { useTerritoriesContext } from './context/TerritoriesContext';

import './components/TerritoriesConsole.css';
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

      <PolygonModal
        isOpen={state.showPolygonModal}
        onClose={closePolygonModal}
        onSave={createPolygon}
      />
      <div className={`territories-map ${state.isDrawing ? 'territories-map-drawing' : ''}`}>
        <MapView clients={[]} prospects={[]} polygonClients={null} onMapClick={addPoint}>
          <TerritoriesDrawingLayer polygons={state.polygons} activePolygon={state.activePolygon} />
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
