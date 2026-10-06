import { useReducer } from 'react';

import { TerritoriesContext } from './TerritoriesContext';

import { territoriesReducer } from './reducers/territoriesReducer';

import { territoriesInitialState } from './reducers/territoriesInitialState';

export function TerritoriesProvider({ children }) {
  const [state, dispatch] = useReducer(territoriesReducer, territoriesInitialState);

  const createPolygon = ({ name, color }) => {
    dispatch({
      type: 'START_POLYGON',

      payload: {
        name,
        color,
      },
    });
  };

  const addPoint = (lat, lng) => {
    if (!state.isDrawing) {
      return;
    }

    dispatch({
      type: 'ADD_POINT',
      payload: [lat, lng],
    });
  };

  const removeLastPoint = () => {
    dispatch({
      type: 'REMOVE_LAST_POINT',
    });
  };

  const closePolygon = () => {
    if (state.activePolygon?.points?.length < 3) {
      return;
    }

    dispatch({
      type: 'CLOSE_POLYGON',
    });
  };

  const deleteCurrentPolygon = () => {
    dispatch({
      type: 'DELETE_CURRENT_POLYGON',
    });
  };

  // const deletePolygon = (id) => {
  //   dispatch({
  //     type: 'DELETE_POLYGON',
  //     payload: id,
  //   });
  // };

  const openPolygonModal = () => {
    dispatch({
      type: 'SHOW_POLYGON_MODAL',
    });
  };

  const closePolygonModal = () => {
    dispatch({
      type: 'HIDE_POLYGON_MODAL',
    });
  };

  const showContextMenu = (event, polygonId) => {
    dispatch({
      type: 'SHOW_CONTEXT_MENU',
      payload: {
        x: event.originalEvent.clientX,
        y: event.originalEvent.clientY,
        polygonId,
      },
    });
  };

  const hideContextMenu = () => {
    dispatch({
      type: 'HIDE_CONTEXT_MENU',
    });
  };

  const deletePolygon = (polygonId) => {
    dispatch({
      type: 'DELETE_POLYGON',
      payload: polygonId,
    });

    hideContextMenu();
  };

  return (
    <TerritoriesContext.Provider
      value={{
        state,

        createPolygon,

        addPoint,

        removeLastPoint,

        closePolygon,

        deleteCurrentPolygon,

        deletePolygon,

        openPolygonModal,

        closePolygonModal,

        showContextMenu,

        hideContextMenu,
      }}
    >
      {children}
    </TerritoriesContext.Provider>
  );
}
