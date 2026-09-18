import type { Client } from '../types/client.types';

export function mapExcelRow(row: any): Client {
  return {
    id: String(row.id),
    name: String(row.name),

    location: {
      lat: Number(row.lat),
      lng: Number(row.lng),
    },

    attributes: {
      c1: row.c1,
      c2: row.c2,
      c3: row.c3,
      c4: row.c4,
      c5: row.c5,
      c6: row.c6,
    },
  };
}
