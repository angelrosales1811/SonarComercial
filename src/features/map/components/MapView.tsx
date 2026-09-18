import { CircleMarker, MapContainer, Popup, TileLayer, ZoomControl } from 'react-leaflet';
import type { MapClient } from '../../../types/map.types';

interface Props {
  clients: MapClient[];
}

export default function MapView({ clients }: Props) {
  return (
    <MapContainer center={[19.0413, -98.2062]} zoom={12} zoomControl={false} className="map">
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution="&copy; OpenStreetMap"
      />

      {clients.map((client) => (
        <CircleMarker
          key={client.id}
          center={client.position}
          radius={6}
          fillColor="#3b82f6"
          color="#ffffff"
          weight={1}
          fillOpacity={0.9}
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
