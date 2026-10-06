import { useReducer } from 'react';

import { ProspectacionContext } from './ProspectacionContext';

import { ACTIONS } from './reducers/prospectacion.actions';
import { initialState } from './reducers/prospectacion.initialState';
import { prospectacionReducer } from './reducers/prospectacion.reducer';

import { exportProspects } from '../services/excelExport.service';
import { importClients } from '../services/excelImport.service';
import { buildPolygon } from '../services/polygon.service';

import { mapExcelRow } from '../mappers/clientMapper';

import { clientToMapClient } from '../mappers/clientToMapClient';

export function ProspectacionProvider({ children }) {
  const [state, dispatch] = useReducer(prospectacionReducer, initialState);

  const loadClients = async (event) => {
    const file = event.target.files?.[0];

    if (!file) return;

    const rows = await importClients(file);

    const clients = rows.map(mapExcelRow).map(clientToMapClient);

    dispatch({
      type: ACTIONS.SET_CLIENTS,
      payload: clients,
    });

    const polygon = buildPolygon(clients);

    dispatch({
      type: ACTIONS.SET_POLYGON,
      payload: polygon,
    });

    event.target.value = '';
  };

  const loadProspects = async (event) => {
    const file = event.target.files?.[0];

    if (!file) return;

    const rows = await importClients(file);

    const prospects = rows.map(mapExcelRow).map(clientToMapClient);

    dispatch({
      type: ACTIONS.SET_PROSPECTS,
      payload: prospects,
    });

    event.target.value = '';
  };

  const exportVisibleProspects = () => {
    exportProspects(state.visibleProspects);
  };

  const clearMap = () => {
    dispatch({
      type: ACTIONS.CLEAR_MAP,
    });
  };

  return (
    <ProspectacionContext.Provider
      value={{
        state,
        dispatch,

        loadClients,
        loadProspects,
        exportVisibleProspects,
        clearMap,
      }}
    >
      {children}
    </ProspectacionContext.Provider>
  );
}
