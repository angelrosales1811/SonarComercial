import { useMapEvents } from 'react-leaflet';

interface Props {
  onMapClick?: (lat: number, lng: number) => void;
}

export default function MapClickEvents({ onMapClick }: Props) {
  useMapEvents({
    click(e) {
      onMapClick?.(e.latlng.lat, e.latlng.lng);
    },
  });

  return null;
}
