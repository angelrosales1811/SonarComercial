import { useEffect } from 'react';
import { useMap } from 'react-leaflet';

import type { MapClient } from '../../../types/map.types';

interface Props {
  clients: MapClient[];
}

export default function AutoFitBounds({ clients }: Props) {
  const map = useMap();

  useEffect(() => {
    if (!clients.length) return;

    const bounds = clients.map((client) => client.position);

    map.fitBounds(bounds, {
      padding: [50, 50],
      maxZoom: 14,
    });
  }, [clients, map]);

  return null;
}
