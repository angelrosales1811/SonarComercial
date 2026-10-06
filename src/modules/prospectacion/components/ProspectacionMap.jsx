import { MapView } from '../../map';
import { useProspectacionContext } from '../context/ProspectacionContext';
import { ACTIONS } from '../context/reducers/prospectacion.actions';
export default function ProspectacionMap() {
  const { state, dispatch } = useProspectacionContext();

  return (
    <MapView
      clients={state.clients}
      prospects={state.prospects}
      polygonClients={state.polygonClients}

      onVisibleProspectsChange={(prospects) =>
        dispatch({
          type: ACTIONS.SET_VISIBLE_PROSPECTS,
          payload: prospects,
        })
      }

      onProspectModeChange={(mode) =>
        dispatch({
          type: ACTIONS.SET_MODE,
          payload: mode,
        })
      }
    />
  );
}
