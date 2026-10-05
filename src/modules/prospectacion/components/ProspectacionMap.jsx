//import MapView from '../../map/components/MapView';
import { MapView } from '../../map';
import { useProspectacionContext } from '../context/ProspectacionContext';

export default function ProspectacionMap() {
  const {
    clients,
    prospects,

    polygonClients,

    setVisibleProspects,

    setProspectMode,
  } = useProspectacionContext();

  return (
    <MapView
      clients={clients}
      prospects={prospects}
      polygonClients={polygonClients}
      onVisibleProspectsChange={setVisibleProspects}
      onProspectModeChange={setProspectMode}
    />
  );
}
