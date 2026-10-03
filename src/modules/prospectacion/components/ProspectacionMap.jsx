import MapView from '../../../features/map/components/MapView';

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
