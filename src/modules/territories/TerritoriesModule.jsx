import MapView from '../map/components/MapView';

import PolygonModal from './components/PolygonModal';

import TerritoriesConsole from './components/TerritoriesConsole';

import TerritoriesDrawingLayer from './layers/TerritoriesDrawingLayer';

import TerritoriesEditingLayer from './layers/TerritoriesEditingLayer';

import { TerritoriesProvider } from './context/TerritoriesProvider';

import { useTerritoriesContext } from './context/TerritoriesContext';

import PolygonContextMenu from './components/PolygonContextMenu';

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
