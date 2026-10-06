export function territoriesReducer(state, action) {
  switch (action.type) {
    case 'SHOW_POLYGON_MODAL':
      return {
        ...state,
        showPolygonModal: true,
      };

    case 'HIDE_POLYGON_MODAL':
      return {
        ...state,
        showPolygonModal: false,
      };

    case 'START_POLYGON':
      return {
        ...state,
        showPolygonModal: false,
        isDrawing: true,

        activePolygon: {
          id: crypto.randomUUID(),
          name: action.payload.name,
          color: action.payload.color,
          points: [],
          closed: false,
        },
      };

    case 'ADD_POINT':
      return {
        ...state,

        activePolygon: {
          ...state.activePolygon,

          points: [...state.activePolygon.points, action.payload],
        },
      };

    case 'REMOVE_LAST_POINT':
      return {
        ...state,

        activePolygon: {
          ...state.activePolygon,

          points: state.activePolygon.points.slice(0, -1),
        },
      };

    case 'CLOSE_POLYGON':
      return {
        ...state,

        polygons: [
          ...state.polygons,
          {
            ...state.activePolygon,
            closed: true,
          },
        ],

        isDrawing: false,

        activePolygon: null,
      };

    case 'DELETE_CURRENT_POLYGON':
      return {
        ...state,
        isDrawing: false,
        activePolygon: null,
      };

    case 'DELETE_POLYGON':
      return {
        ...state,

        polygons: state.polygons.filter((polygon) => polygon.id !== action.payload),
      };

    case 'SHOW_CONTEXT_MENU':
      return {
        ...state,
        contextMenu: {
          visible: true,
          x: action.payload.x,
          y: action.payload.y,
          polygonId: action.payload.polygonId,
        },
      };

    case 'HIDE_CONTEXT_MENU':
      return {
        ...state,
        contextMenu: {
          visible: false,
          x: 0,
          y: 0,
          polygonId: null,
        },
      };

    default:
      return state;
  }
}
