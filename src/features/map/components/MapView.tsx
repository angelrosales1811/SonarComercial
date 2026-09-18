import { MapContainer, TileLayer, ZoomControl } from 'react-leaflet';

export default function MapView() {
  return (
    <MapContainer center={[19.0413, -98.2062]} zoom={12} zoomControl={false} className="map">
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution="OpenStreetMap"
      />

      {/* <Marker position={[19.0413, -98.2062]}>
        <Popup>Puebla</Popup>
      </Marker> */}
      <ZoomControl position="bottomright" />
    </MapContainer>
  );
}
