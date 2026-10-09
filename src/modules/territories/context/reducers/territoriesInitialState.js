export const territoriesInitialState = {
  polygons: [],
  activePolygon: null,
  isDrawing: false,
  showPolygonModal: false,

  polygonModal: {
    visible: false,
  },

  editingPolygonId: null,
  editingPolygon: null,
  editingBackup: null,

  contextMenu: {
    visible: false,
    x: 0,
    y: 0,
    polygonId: null,
  },

  topPolygonId: null,
};
