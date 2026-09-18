export interface Client {
  id: string;
  name: string;

  location: {
    lat: number;
    lng: number;
  };

  attributes: {
    c1?: string;
    c2?: string;
    c3?: string;
    c4?: string;
    c5?: string;
    c6?: string;
  };
}
