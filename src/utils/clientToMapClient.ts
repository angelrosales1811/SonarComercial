import type { Client } from '../types/client.types';
import type { MapClient } from '../types/map.types';

export function clientToMapClient(client: Client): MapClient {
  return {
    id: client.id,

    name: client.name,

    position: [client.location.lat, client.location.lng],

    attributes: client.attributes,
  };
}
