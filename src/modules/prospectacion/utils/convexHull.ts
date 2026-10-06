import * as turf from '@turf/turf';
import type { Feature, Polygon } from 'geojson';
import type { MapClient } from '../../../shared/types/map.types';

export function generateConvexHull(clients: MapClient[]): Feature<Polygon> | null {
  if (clients.length < 3) {
    return null;
  }

  const validClients = clients.filter(
    (client) => Array.isArray(client.position) && client.position.length === 2
  );

  const points = validClients.map((client) => turf.point([client.position[1], client.position[0]]));

  const collection = turf.featureCollection(points);

  return turf.convex(collection) as Feature<Polygon> | null;
}
