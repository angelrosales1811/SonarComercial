import { createContext, useContext } from 'react';

export const TerritoriesContext = createContext(null);

export function useTerritoriesContext() {
  const context = useContext(TerritoriesContext);

  if (!context) {
    throw new Error('useTerritoriesContext debe ejecutarse dentro de TerritoriesProvider');
  }

  return context;
}
