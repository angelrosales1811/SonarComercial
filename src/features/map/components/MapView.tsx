import type { Feature, Polygon } from 'geojson';
import { CircleMarker, GeoJSON, MapContainer, Popup, TileLayer, ZoomControl } from 'react-leaflet';
import type { MapClient } from '../../../types/map.types';
import AutoFitBounds from './AutoFitBounds';

interface Props {
  clients: MapClient[];
  polygon: Feature<Polygon> | null;
}

export default function MapView({ clients, polygon }: Props) {
  return (
    <MapContainer center={[19.0413, -98.2062]} zoom={12} zoomControl={false} className="map">
      <AutoFitBounds clients={clients} />
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution="&copy; OpenStreetMap"
      />

      {polygon && (
        <GeoJSON
          data={polygon}
          style={{
            color: '#044627',
            weight: 2,
            dashArray: '10 6',
            fillColor: '#078039',
            fillOpacity: 0.3,
          }}
        />
      )}

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

      <ZoomControl position="bottomright" />
    </MapContainer>
  );
}
