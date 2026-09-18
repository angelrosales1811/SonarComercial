import * as turf from '@turf/turf';
import type { Feature, Polygon } from 'geojson';
import type { MapClient } from '../types/map.types';

export function generateConvexHull(clients: MapClient[]): Feature<Polygon> | null {
  if (clients.length < 3) {
    return null;
  }

  const points = clients.map((client) =>
    turf.point([
      client.position[1], // lng
      client.position[0], // lat
    ])
  );

  const collection = turf.featureCollection(points);

  return turf.convex(collection) as Feature<Polygon> | null;
}
