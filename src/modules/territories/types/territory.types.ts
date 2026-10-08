export type Coordinate = [number, number];

export interface TerritoryPolygon {
  id: string;
  name: string;
  color: string;
  points: Coordinate[];
}

export interface TerritoriesState {
  polygons: TerritoryPolygon[];
  activePolygon: TerritoryPolygon | null;
  editingPolygonId: string | null;
  isDrawing: boolean;
}
