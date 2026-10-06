import { ACTIONS } from './prospectacion.actions';
import { initialState } from './prospectacion.initialState';

export function prospectacionReducer(state = initialState, action) {
  switch (action.type) {
    case ACTIONS.SET_CLIENTS:
      return {
        ...state,
        clients: action.payload,
      };

    case ACTIONS.SET_PROSPECTS:
      return {
        ...state,
        prospects: action.payload,
      };

    case ACTIONS.SET_VISIBLE_PROSPECTS:
      return {
        ...state,
        visibleProspects: action.payload,
      };

    case ACTIONS.SET_POLYGON:
      return {
        ...state,
        polygonClients: action.payload,
      };

    case ACTIONS.SET_MODE:
      return {
        ...state,
        prospectMode: action.payload,
      };

    case ACTIONS.CLEAR_MAP:
      return {
        ...state,

        clients: [],
        prospects: [],
        visibleProspects: [],

        polygonClients: null,

        selectedClient: null,
        selectedProspect: null,
      };

    case ACTIONS.SET_SELECTED_CLIENT:
      return {
        ...state,
        selectedClient: action.payload,
      };

    case ACTIONS.SET_SELECTED_PROSPECT:
      return {
        ...state,
        selectedProspect: action.payload,
      };

    case ACTIONS.SET_SHOW_EXAMPLES_MENU:
      return {
        ...state,
        showExamplesMenu: action.payload,
      };

    default:
      return state;
  }
}
