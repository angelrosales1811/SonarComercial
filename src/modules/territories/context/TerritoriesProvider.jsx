import { saveAs } from 'file-saver';
import { useReducer } from 'react';
import * as XLSX from 'xlsx';

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
    if (state.editingPolygonId) {
      return;
    }
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

  const exportPolygonKml = (polygonId) => {
    const polygon = state.polygons.find((p) => p.id === polygonId);

    if (!polygon) {
      return;
    }

    const coordinates = polygon.points.map(([lat, lng]) => `${lng},${lat},0`).join(' ');

    const firstPoint = polygon.points[0];

    const closedCoordinates = coordinates + ` ${firstPoint[1]},${firstPoint[0]},0`;

    const kml = `<?xml version="1.0" encoding="UTF-8"?>
<kml xmlns="http://www.opengis.net/kml/2.2">
  <Document>
    <Placemark>
      <name>${polygon.name}</name>
      <Polygon>
        <outerBoundaryIs>
          <LinearRing>
            <coordinates>
              ${closedCoordinates}
            </coordinates>
          </LinearRing>
        </outerBoundaryIs>
      </Polygon>
    </Placemark>
  </Document>
</kml>`;

    const blob = new Blob([kml], {
      type: 'application/vnd.google-earth.kml+xml',
    });

    saveAs(blob, `${polygon.name}.kml`);

    hideContextMenu();
  };

  const exportPolygonExcel = (polygonId) => {
    const polygon = state.polygons.find((p) => p.id === polygonId);

    if (!polygon) {
      return;
    }

    const vertices = polygon.points.map(([lat, lng], index) => ({
      Vertice: index + 1,
      Latitud: lat,
      Longitud: lng,
    }));

    const worksheet = XLSX.utils.json_to_sheet(vertices);

    const workbook = XLSX.utils.book_new();

    XLSX.utils.book_append_sheet(workbook, worksheet, 'Vertices');

    const excelBuffer = XLSX.write(workbook, {
      bookType: 'xlsx',
      type: 'array',
    });

    const blob = new Blob([excelBuffer], {
      type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    });

    saveAs(blob, `${polygon.name}_vertices.xlsx`);

    hideContextMenu();
  };

  const startEditPolygon = (polygonId) => {
    dispatch({
      type: 'START_EDIT_POLYGON',
      payload: polygonId,
    });

    hideContextMenu();
  };

  const stopEditPolygon = () => {
    dispatch({
      type: 'STOP_EDIT_POLYGON',
    });
  };

  const moveVertex = (polygonId, vertexIndex, lat, lng) => {
    dispatch({
      type: 'MOVE_VERTEX',
      payload: {
        polygonId,
        vertexIndex,
        lat,
        lng,
      },
    });
  };

  const deleteVertex = (polygonId, vertexIndex) => {
    dispatch({
      type: 'DELETE_VERTEX',
      payload: {
        polygonId,
        vertexIndex,
      },
    });
  };

  const insertVertex = (polygonId, insertIndex, lat, lng) => {
    dispatch({
      type: 'INSERT_VERTEX',
      payload: {
        polygonId,
        insertIndex,
        lat,
        lng,
      },
    });
  };

  const saveEditedPolygon = () => {
    dispatch({
      type: 'SAVE_EDITED_POLYGON',
    });
  };

  const cancelEditPolygon = () => {
    dispatch({
      type: 'CANCEL_EDIT_POLYGON',
    });
  };

  const savePolygonCopy = () => {
    dispatch({
      type: 'SAVE_POLYGON_COPY',
    });
  };

  const bringPolygonToFront = (polygonId) => {
    dispatch({
      type: 'BRING_POLYGON_TO_FRONT',
      payload: polygonId,
    });
  };

  const selectPolygon = (polygonId) => {
    dispatch({
      type: 'SELECT_POLYGON',
      payload: polygonId,
    });
  };

  const movePolygonToTop = (polygonId) => {
    dispatch({
      type: 'MOVE_POLYGON_TO_TOP',
      payload: polygonId,
    });
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

        exportPolygonKml,
        exportPolygonExcel,

        startEditPolygon,
        stopEditPolygon,

        saveEditedPolygon,
        savePolygonCopy,
        cancelEditPolygon,

        moveVertex,
        deleteVertex,
        insertVertex,

        // bringPolygonToFront,
        selectPolygon,
        movePolygonToTop,
      }}
    >
      {children}
    </TerritoriesContext.Provider>
  );
}
