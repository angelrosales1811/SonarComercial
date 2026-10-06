import { createContext, useContext } from 'react';

export const ProspectacionContext = createContext();

export function useProspectacionContext() {
  return useContext(ProspectacionContext);
}

export function useProspectacion() {
  return useContext(ProspectacionContext);
}
