import { CircleMarker, Pane, Polygon, Polyline } from 'react-leaflet';
// @ts-ignore
import { useTerritoriesContext } from '../context/TerritoriesContext';

interface Props {
  polygons?: any[];
  activePolygon?: any;
}

export default function TerritoriesDrawingLayer({ polygons = [], activePolygon = null }: Props) {
  const { state, showContextMenu } = useTerritoriesContext();

  const topPolygon = polygons.find((p) => p.id === state.topPolygonId);

  const normalPolygons = polygons.filter((p) => p.id !== state.topPolygonId);

  return (
    <>
      {/* POLÍGONOS NORMALES */}
      <Pane
        name="territories"
        style={{
          zIndex: 400,
        }}
      >
        {normalPolygons.map((polygon) => (
          <Polygon
            key={polygon.id}
            positions={polygon.points}
            pathOptions={{
              color: polygon.color,
              fillColor: polygon.color,
              fillOpacity: 0.3,
            }}
            eventHandlers={{
              contextmenu: (e) => {
                if (state.editingPolygonId) {
                  e.originalEvent?.preventDefault();
                  e.originalEvent?.stopPropagation();
                  return;
                }

                showContextMenu(e, polygon.id);
              },
            }}
          />
        ))}
      </Pane>

      {/* POLÍGONO PRIORITARIO */}
      <Pane
        name="territories-top"
        style={{
          zIndex: 450,
        }}
      >
        {topPolygon && (
          <Polygon
            key={topPolygon.id}
            positions={topPolygon.points}
            pathOptions={{
              color: topPolygon.color,
              fillColor: topPolygon.color,
              fillOpacity: 0.35,
              weight: 4,
            }}
            eventHandlers={{
              contextmenu: (e) => {
                if (state.editingPolygonId) {
                  e.originalEvent?.preventDefault();
                  e.originalEvent?.stopPropagation();
                  return;
                }

                showContextMenu(e, topPolygon.id);
              },
            }}
          />
        )}
      </Pane>

      {/* POLÍGONO EN DIBUJO (SIEMPRE ENCIMA) */}
      {activePolygon?.points?.length > 1 && (
        <Pane
          name="active-polygon"
          style={{
            zIndex: 550,
          }}
        >
          <Polyline positions={activePolygon.points} color={activePolygon.color} weight={4} />
        </Pane>
      )}

      {/* VÉRTICES DEL DIBUJO */}
      {activePolygon?.points?.map((point: [number, number], index: number) => (
        <CircleMarker
          key={index}
          center={point}
          radius={6}
          pathOptions={{
            color: '#fff',
            weight: 2,
            fillColor: activePolygon.color,
            fillOpacity: 1,
          }}
        />
      ))}
    </>
  );
}
