import MapView from '../../map/components/MapView';
import TerritoriesConsole from '../components/TerritoriesConsole';

export default function TerritoriesPage() {
  return (
    <>
      <TerritoriesConsole />

      <div className="territories-map-wrapper">
        <MapView clients={[]} prospects={[]} polygonClients={null} />
      </div>
    </>
  );
}
