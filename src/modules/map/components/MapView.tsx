import * as turf from '@turf/turf';
import type { Feature, Polygon } from 'geojson';
import L from 'leaflet';
import { useEffect, useMemo, useRef, useState } from 'react';
import { FiDisc, FiEye, FiGlobe, FiMap, FiMapPin, FiTarget, FiX } from 'react-icons/fi';
import {
  CircleMarker,
  GeoJSON,
  MapContainer,
  Pane,
  Popup,
  TileLayer,
  ZoomControl,
} from 'react-leaflet';
import type { MapClient } from '../../../shared/types/map.types';
import AutoFitBounds from './AutoFitBounds';
import MapClickEvents from './MapClickEvents';

interface Props {
  clients: MapClient[];

  prospects: MapClient[];

  polygonClients: Feature<Polygon> | null;

  children?: React.ReactNode;

  onMapClick?: (lat: number, lng: number) => void;

  onVisibleProspectsChange?: (prospects: MapClient[]) => void;

  onProspectModeChange?: (mode: 'PROSPECTS' | 'CAPTABLES') => void;
}

export default function MapView({
  clients,
  prospects,
  polygonClients,

  children,

  onMapClick,

  onVisibleProspectsChange,
  onProspectModeChange,
}: Props) {
  const [contextMenu, setContextMenu] = useState<{
    visible: boolean;
    x: number;
    y: number;
  } | null>(null);

  const [showClients, setShowClients] = useState(true);
  const [captureDistanceMeters, setCaptureDistanceMeters] = useState(10);

  const sliderRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sliderRef.current) return;

    L.DomEvent.disableClickPropagation(sliderRef.current);
    L.DomEvent.disableScrollPropagation(sliderRef.current);
  }, []);
  type ProspectFilter = 'ALL' | 'INSIDE' | 'OUTSIDE' | 'CAPTABLES';

  const [prospectFilter, setProspectFilter] = useState<ProspectFilter>('ALL');
  useEffect(() => {
    setProspectFilter('ALL');
    setContextMenu(null);
  }, [clients, prospects]);

  const visibleProspects = useMemo(() => {
    return prospects.filter((prospect) => {
      if (prospectFilter === 'CAPTABLES') {
        return isCaptable(prospect, clients, polygonClients, captureDistanceMeters);
      }

      if (!polygonClients || prospectFilter === 'ALL') {
        return true;
      }

      const point = turf.point([prospect.position[1], prospect.position[0]]);

      const inside = turf.booleanPointInPolygon(point, polygonClients);

      switch (prospectFilter) {
        case 'INSIDE':
          return inside;

        case 'OUTSIDE':
          return !inside;

        default:
          return true;
      }
    });
  }, [prospects, clients, polygonClients, prospectFilter, captureDistanceMeters]);

  const captablesCount = useMemo(() => {
    return prospects.filter((prospect) =>
      isCaptable(prospect, clients, polygonClients, captureDistanceMeters)
    ).length;
  }, [prospects, clients, polygonClients, captureDistanceMeters]);

  useEffect(() => {
    onVisibleProspectsChange?.(visibleProspects);
  }, [visibleProspects]);

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

  function showInsideProspects() {
    setProspectFilter('INSIDE');
    onProspectModeChange?.('PROSPECTS');
    setContextMenu(null);
  }

  function showOutsideProspects() {
    setProspectFilter('OUTSIDE');
    onProspectModeChange?.('PROSPECTS');
    setContextMenu(null);
  }

  function showAllProspects() {
    setProspectFilter('ALL');
    onProspectModeChange?.('PROSPECTS');
    setContextMenu(null);
  }

  function isCaptable(
    prospect: MapClient,
    clients: MapClient[],
    polygon: Feature<Polygon> | null,
    maxDistanceMeters: number
  ) {
    // 1. Debe estar dentro del territorio
    if (!isInsideTerritory(prospect, polygon)) {
      return false;
    }

    const prospectPoint = turf.point([prospect.position[1], prospect.position[0]]);

    // 2. Buscar clientes cercanos
    const hasNearbyClient = clients.some((client) => {
      const clientPoint = turf.point([client.position[1], client.position[0]]);

      const distance = turf.distance(prospectPoint, clientPoint, {
        units: 'meters',
      });

      return distance <= maxDistanceMeters;
    });

    // 3. Es captable solo si NO tiene clientes cercanos
    return !hasNearbyClient;
  }

  function showCaptables() {
    setProspectFilter('CAPTABLES');
    onProspectModeChange?.('CAPTABLES');
    setContextMenu(null);
  }

  function isInsideTerritory(prospect: MapClient, polygon: Feature<Polygon> | null) {
    if (!polygon) return false;

    const point = turf.point([
      prospect.position[1], // lng
      prospect.position[0], // lat
    ]);

    return turf.booleanPointInPolygon(point, polygon);
  }

  return (
    <>
      <MapContainer center={[23.634501, -102.552784]} zoom={5} zoomControl={false}>
        <MapClickEvents onMapClick={onMapClick} />
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

                  {client.attributes?.c1}

                  <br />

                  {client.attributes?.c2}
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
        {children}

        <ZoomControl position="bottomright" />
      </MapContainer>

      <div ref={sliderRef} className="capture-distance-slider">
        <div className="capture-distance-value">{captureDistanceMeters}m</div>

        <input
          type="range"
          min={10}
          max={100}
          step={5}
          value={captureDistanceMeters}
          onChange={(e) => setCaptureDistanceMeters(Number(e.target.value))}
          // orient="vertical"
        />
      </div>

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
            <FiMap />
            <span>Descargar vértices</span>
          </button>

          <button className="context-menu-item" onClick={downloadKml}>
            <FiMapPin />
            <span>Exportar KML Territorio</span>
          </button>

          <button className="context-menu-item" onClick={toggleClients}>
            <FiEye />
            <span>{showClients ? 'Ocultar clientes' : 'Mostrar clientes'}</span>
          </button>

          <button className="context-menu-item" onClick={showInsideProspects}>
            <FiTarget />
            <span>Prospectos dentro</span>
          </button>

          <button className="context-menu-item" onClick={showOutsideProspects}>
            <FiDisc />
            <span>Prospectos fuera</span>
          </button>

          <button className="context-menu-item" onClick={showAllProspects}>
            <FiGlobe />
            <span>Prospectos Completos</span>
          </button>

          <button className="context-menu-item" onClick={showCaptables}>
            <FiTarget />
            <span>Captables ({captablesCount})</span>
          </button>

          <div className="context-menu-divider" />

          <button className="context-menu-item danger" onClick={() => setContextMenu(null)}>
            <FiX />
            <span>Cerrar</span>
          </button>
        </div>
      )}
    </>
  );
}
