import * as turf from '@turf/turf';
import type { Feature, Polygon } from 'geojson';
import { useEffect, useState } from 'react';
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
  prospects: MapClient[];
  polygonClients: Feature<Polygon> | null;
}

export default function MapView({ clients, prospects, polygonClients }: Props) {
  const [contextMenu, setContextMenu] = useState<{
    visible: boolean;
    x: number;
    y: number;
  } | null>(null);

  const [showClients, setShowClients] = useState(true);
  const [showOnlyInsideProspects, setShowOnlyInsideProspects] = useState(false);
  type ProspectFilter = 'ALL' | 'INSIDE' | 'OUTSIDE';

  const [prospectFilter, setProspectFilter] = useState<ProspectFilter>('ALL');
  useEffect(() => {
    setProspectFilter('ALL');
    setContextMenu(null);
  }, [clients, prospects]);

  const visibleProspects = prospects.filter((prospect) => {
    if (!polygonClients || prospectFilter === 'ALL') {
      return true;
    }

    const point = turf.point([
      prospect.position[1], // lng
      prospect.position[0], // lat
    ]);

    const inside = turf.booleanPointInPolygon(point, polygonClients);

    return prospectFilter === 'INSIDE' ? inside : !inside;
  });

  function showPolygonContextMenu(event: any) {
    const originalEvent = event.originalEvent;

    const menu = {
      visible: true,
      x: originalEvent.clientX,
      y: originalEvent.clientY,
    };

    setContextMenu(menu);
  }
  function downloadVertices() {
    if (!polygonClients) return;

    const coordinates = polygonClients.geometry.coordinates[0];

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
    if (!polygonClients) return;

    const coordinates = polygonClients.geometry.coordinates[0];

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

  function toggleClients() {
    setShowClients((prev) => !prev);
    setContextMenu(null);
  }

  // function prospectsIn() {
  //   setShowOnlyInsideProspects((prev) => {
  //     return !prev;
  //   });

  //   setContextMenu(null);
  // }

  function showInsideProspects() {
    setProspectFilter('INSIDE');
    setContextMenu(null);
  }

  function showOutsideProspects() {
    setProspectFilter('OUTSIDE');
    setContextMenu(null);
  }

  function showAllProspects() {
    setProspectFilter('ALL');
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

        {polygonClients && (
          <Pane name="territory" style={{ zIndex: 300 }}>
            <GeoJSON
              data={polygonClients}
              interactive
              eventHandlers={{
                contextmenu: (e) => {
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

        {showClients && (
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
        )}

        <Pane name="prospects" style={{ zIndex: 550 }}>
          {visibleProspects.map((prospect) => (
            <CircleMarker
              key={prospect.id}
              center={prospect.position}
              radius={10}
              fillColor="#c55022"
              color="#ffffff"
              weight={2}
              fillOpacity={1}
            >
              <Popup>
                <strong>{prospect.name}</strong>
                <br />
                Prospecto
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
            <span>Exportar KML Territorio</span>
          </button>

          <button className="context-menu-item" onClick={toggleClients}>
            <span>👁️</span>
            <span>{showClients ? 'Ocultar clientes' : 'Mostrar clientes'}</span>
          </button>

          <button className="context-menu-item" onClick={showInsideProspects}>
            <span>🎯</span>
            <span>Prospectos dentro</span>
          </button>

          <button className="context-menu-item" onClick={showOutsideProspects}>
            <span>🚫</span>
            <span>Prospectos fuera</span>
          </button>

          <button className="context-menu-item" onClick={showAllProspects}>
            <span>🌎</span>
            <span>Prospectos Completos</span>
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
