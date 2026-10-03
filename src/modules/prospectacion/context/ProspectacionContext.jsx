import { createContext, useContext } from 'react';

const ProspectacionContext = createContext();

export function ProspectacionProvider({ children, value }) {
  return <ProspectacionContext.Provider value={value}>{children}</ProspectacionContext.Provider>;
}

export function useProspectacionContext() {
  return useContext(ProspectacionContext);
}
