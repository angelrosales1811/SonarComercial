import type { Feature, Polygon } from 'geojson';
import { useState } from 'react';
import {
  CircleMarker,
  GeoJSON,
  MapContainer,
  Pane,
  Popup,
  TileLayer,
  ZoomControl,
} from 'react-leaflet';
import type { MapClient } from '../../../types/map.types';
import AutoFitBounds from './AutoFitBounds';

interface Props {
  clients: MapClient[];
  polygon: Feature<Polygon> | null;
}

export default function MapView({ clients, polygon }: Props) {
  const [contextMenu, setContextMenu] = useState<{
    visible: boolean;
    x: number;
    y: number;
  } | null>(null);

  function showPolygonContextMenu(event: any) {
    const originalEvent = event.originalEvent;

    const menu = {
      visible: true,
      x: originalEvent.clientX,
      y: originalEvent.clientY,
    };

    console.log(menu);

    setContextMenu(menu);
  }
  function downloadVertices() {
    if (!polygon) return;

    const coordinates = polygon.geometry.coordinates[0];

    const csv = ['Latitud,Longitud', ...coordinates.map(([lng, lat]) => `${lat},${lng}`)].join(
      '\n'
    );

    const blob = new Blob([csv], {
      type: 'text/csv;charset=utf-8;',
    });

    const url = URL.createObjectURL(blob);

    const link = document.createElement('a');

    link.href = url;
    link.download = 'vertices_poligono.csv';

    link.click();

    URL.revokeObjectURL(url);

    setContextMenu(null);
  }

  function downloadKml() {
    if (!polygon) return;

    const coordinates = polygon.geometry.coordinates[0];

    const kmlCoordinates = coordinates.map(([lng, lat]) => `${lng},${lat},0`).join(' ');

    const kml = `<?xml version="1.0" encoding="UTF-8"?>
<kml xmlns="http://www.opengis.net/kml/2.2">
  <Document>
    <name>Territorio SONAR</name>

    <Placemark>
      <name>Convex Hull</name>

      <Style>
        <LineStyle>
          <color>ff278004</color>
          <width>3</width>
        </LineStyle>

        <PolyStyle>
          <color>66078039</color>
        </PolyStyle>
      </Style>

      <Polygon>
        <outerBoundaryIs>
          <LinearRing>
            <coordinates>
              ${kmlCoordinates}
            </coordinates>
          </LinearRing>
        </outerBoundaryIs>
      </Polygon>

    </Placemark>
  </Document>
</kml>`;

    const blob = new Blob([kml], {
      type: 'application/vnd.google-earth.kml+xml',
    });

    const url = URL.createObjectURL(blob);

    const link = document.createElement('a');

    link.href = url;
    link.download = 'territorio.kml';

    document.body.appendChild(link);

    link.click();

    document.body.removeChild(link);

    URL.revokeObjectURL(url);

    setContextMenu(null);
  }

  return (
    <>
      <MapContainer center={[19.0413, -98.2062]} zoom={12} zoomControl={false} className="map">
        <AutoFitBounds clients={clients} />
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution="&copy; OpenStreetMap"
        />

        {polygon && (
          <Pane name="territory" style={{ zIndex: 300 }}>
            <GeoJSON
              data={polygon}
              interactive
              eventHandlers={{
                contextmenu: (e) => {
                  console.log('CLICK DERECHO', e);
                  showPolygonContextMenu(e);
                },
              }}
              style={{
                color: '#044627',
                weight: 2,
                dashArray: '10 6',
                fillColor: '#078039',
                fillOpacity: 0.3,
              }}
            />
          </Pane>
        )}

        <Pane name="clients" style={{ zIndex: 600 }}>
          {clients.map((client) => (
            <CircleMarker
              className="client-marker"
              key={client.id}
              center={client.position}
              radius={5}
              fillColor="#0066ff"
              color="#FFFFFF"
              weight={2}
              fillOpacity={1}
            >
              <Popup>
                <strong>{client.name}</strong>

                <br />

                {client.attributes.c1}

                <br />

                {client.attributes.c2}
              </Popup>
            </CircleMarker>
          ))}
        </Pane>

        <ZoomControl position="bottomright" />
      </MapContainer>
      {contextMenu?.visible && (
        <div
          className="context-menu"
          style={{
            left: contextMenu.x,
            top: contextMenu.y,
          }}
        >
          <div className="context-menu-header">Territorio</div>

          <button className="context-menu-item" onClick={downloadVertices}>
            <span>📍</span>
            <span>Descargar vértices</span>
          </button>

          <button className="context-menu-item" onClick={downloadKml}>
            <span>🌎</span>
            <span>Exportar KML</span>
          </button>

          <div className="context-menu-divider" />

          <button className="context-menu-item danger" onClick={() => setContextMenu(null)}>
            <span>✖</span>
            <span>Cerrar</span>
          </button>
        </div>
      )}
    </>
  );
}
