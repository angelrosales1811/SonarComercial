import { MapContainer, Marker, Popup, TileLayer, ZoomControl } from 'react-leaflet';
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
        <Marker key={client.id} position={client.position}>
          <Popup>
            <strong>{client.name}</strong>

            <br />

            {client.attributes.c1}

            <br />

            {client.attributes.c2}
          </Popup>
        </Marker>
      ))}

      <ZoomControl position="bottomright" />
    </MapContainer>
  );
}
