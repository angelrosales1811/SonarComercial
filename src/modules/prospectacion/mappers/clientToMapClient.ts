import type { MapClient } from '../../../shared/types/map.types';
import type { Client } from '../types/client.types';

export function clientToMapClient(client: Client): MapClient {
  return {
    id: client.id,

    name: client.name,

    position: [client.location.lat, client.location.lng],

    attributes: client.attributes,
  };
}
