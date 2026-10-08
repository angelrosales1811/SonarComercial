import { CircleMarker, Marker, Pane, Polygon } from 'react-leaflet';
// @ts-ignore
import { useTerritoriesContext } from '../context/TerritoriesContext';

type Coordinate = [number, number];

import L from 'leaflet';

const vertexIcon = L.divIcon({
  className: 'vertex-marker',
  html: '<div class="vertex-marker-inner"></div>',
  iconSize: [18, 18],
  iconAnchor: [9, 9],
});

export default function TerritoriesEditingLayer() {
  const { state, moveVertex, deleteVertex, insertVertex } = useTerritoriesContext();

  if (!state.editingPolygonId || !state.editingPolygon) {
    return null;
  }

  const polygon = state.editingPolygon;

  if (!polygon) {
    console.warn('No existe polígono para editar o editingPolygonId es null');

    return null;
  }

  function midpoint(a: Coordinate, b: Coordinate): Coordinate {
    return [(a[0] + b[0]) / 2, (a[1] + b[1]) / 2];
  }

  return (
    <>
      {/* PUNTOS MEDIOS VISUALES PARA DEBUG */}

      <Pane name="midpoints" style={{ zIndex: 700 }}>
        {polygon.points.map((point: Coordinate, index: number) => {
          const next = polygon.points[(index + 1) % polygon.points.length];

          const middle = midpoint(point, next);

          return (
            <CircleMarker
              key={`middle-${index}`}
              center={middle}
              radius={6}
              pathOptions={{
                color: '#304ea1',
                fillColor: '#8cd8ebc4',
                fillOpacity: 1,
                weight: 2,
              }}
              eventHandlers={{
                click: () => {
                  insertVertex(polygon.id, index + 1, middle[0], middle[1]);
                },
              }}
            />
          );
        })}
      </Pane>

      {/* VERTICES EDITABLES */}

      <Pane name="vertices" style={{ zIndex: 800 }}>
        {polygon.points.map(([lat, lng]: Coordinate, index: number) => {
          return (
            <Marker
              key={`${polygon.id}-${index}`}
              draggable

              position={[lat, lng]}
              icon={vertexIcon}
              eventHandlers={{
                dragstart: () => {
                  console.log(`Iniciando movimiento vértice ${index + 1}`);
                },

                dragend: (e: any) => {
                  const pos = e.target.getLatLng();

                  moveVertex(polygon.id, index, pos.lat, pos.lng);
                },

                contextmenu: (e: any) => {
                  if (e.originalEvent) {
                    e.originalEvent.preventDefault();
                    e.originalEvent.stopPropagation();
                  }

                  deleteVertex(polygon.id, index);
                },
              }}
            />
          );
        })}
      </Pane>

      <Pane name="editing-polygon" style={{ zIndex: 500 }}>
        {state.editingPolygon && (
          <Polygon
            positions={state.editingPolygon.points}
            pathOptions={{
              color: '#ff9800',
              fillColor: '#ff9800',
              fillOpacity: 0.3,
            }}
          />
        )}
      </Pane>
    </>
  );
}
