import { generateConvexHull } from '../utils/convexHull';

export function buildPolygon(clients) {
  return generateConvexHull(clients);
}
