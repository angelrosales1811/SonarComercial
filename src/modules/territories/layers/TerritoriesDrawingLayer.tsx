import { CircleMarker, Pane, Polygon, Polyline } from 'react-leaflet';

interface Props {
  polygons?: any[];
  activePolygon?: any;
}

export default function TerritoriesDrawingLayer({ polygons = [], activePolygon = null }: Props) {
  return (
    <Pane name="territories" style={{ zIndex: 400 }}>
      {polygons.map((polygon) => (
        <Polygon
          key={polygon.id}
          positions={polygon.points}
          pathOptions={{
            color: polygon.color,
            fillColor: polygon.color,
            fillOpacity: 0.3,
          }}
        />
      ))}

      {activePolygon?.points?.length > 1 && (
        <Polyline positions={activePolygon.points} color={activePolygon.color} />
      )}

      {activePolygon?.points?.map((point: any, index: number) => (
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
    </Pane>
  );
}
