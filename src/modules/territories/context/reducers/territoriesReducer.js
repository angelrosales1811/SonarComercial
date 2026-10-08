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

    case 'START_EDIT_POLYGON': {
      const polygon = state.polygons.find((p) => p.id === action.payload);

      if (!polygon) {
        return state;
      }

      return {
        ...state,

        editingPolygonId: polygon.id,
        contextMenu: {
          visible: false,
          x: 0,
          y: 0,
          polygonId: null,
        },

        editingBackup: structuredClone(polygon),

        editingPolygon: {
          ...structuredClone(polygon),

          id: crypto.randomUUID(),
        },

        polygons: state.polygons.filter((p) => p.id !== polygon.id),
      };
    }

    case 'STOP_EDIT_POLYGON':
      return {
        ...state,

        editingPolygonId: null,
        editingPolygon: null,
        editingBackup: null,

        isDrawing: false,
        activePolygon: null,
      };

    case 'MOVE_VERTEX': {
      const points = [...state.editingPolygon.points];

      points[action.payload.vertexIndex] = [action.payload.lat, action.payload.lng];

      return {
        ...state,

        editingPolygon: {
          ...state.editingPolygon,
          points,
        },
      };
    }

    case 'DELETE_VERTEX':
      return {
        ...state,

        editingPolygon: {
          ...state.editingPolygon,

          points: state.editingPolygon.points.filter(
            (_, index) => index !== action.payload.vertexIndex
          ),
        },
      };

    case 'INSERT_VERTEX': {
      const points = [...state.editingPolygon.points];

      points.splice(action.payload.insertIndex, 0, [action.payload.lat, action.payload.lng]);

      return {
        ...state,

        editingPolygon: {
          ...state.editingPolygon,
          points,
        },
      };
    }

    case 'CREATE_POLYGON_COPY':
      return {
        ...state,

        polygons: [
          ...state.polygons,

          {
            ...action.payload,

            id: crypto.randomUUID(),

            name: `${action.payload.name} (Copia)`,
          },
        ],
      };

    // case 'RESTORE_EDIT_POLYGON':
    //   return {
    //     ...state,

    //     polygons: state.polygons.map((polygon) => {
    //       if (polygon.id !== state.editingBackup?.id) {
    //         return polygon;
    //       }

    //       return structuredClone(state.editingBackup);
    //     }),

    //     editingPolygonId: null,

    //     editingBackup: null,
    //   };

    // case 'SAVE_POLYGON_COPY': {
    //   const polygon = state.polygons.find((p) => p.id === state.editingPolygonId);

    //   if (!polygon) {
    //     return state;
    //   }

    //   return {
    //     ...state,

    //     polygons: [
    //       ...state.polygons,

    //       {
    //         ...structuredClone(polygon),

    //         id: crypto.randomUUID(),

    //         name: `${polygon.name} (Copia)`,
    //       },
    //     ],

    //     editingPolygonId: null,

    //     editingBackup: null,
    //   };
    // }

    case 'SAVE_EDITED_POLYGON':
      return {
        ...state,

        polygons: [...state.polygons, structuredClone(state.editingPolygon)],

        editingPolygon: null,
        editingBackup: null,
        editingPolygonId: null,

        isDrawing: false,
        activePolygon: null,
      };

    case 'SAVE_POLYGON_COPY':
      return {
        ...state,

        polygons: [
          ...state.polygons,

          structuredClone(state.editingBackup),

          {
            ...structuredClone(state.editingPolygon),

            id: crypto.randomUUID(),

            name: state.editingPolygon.name + ' (Copia)',
          },
        ],

        editingPolygon: null,
        editingBackup: null,
        editingPolygonId: null,

        isDrawing: false,
        activePolygon: null,
      };

    case 'CANCEL_EDIT_POLYGON':
      return {
        ...state,

        polygons: [...state.polygons, structuredClone(state.editingBackup)],

        editingPolygon: null,
        editingBackup: null,
        editingPolygonId: null,

        isDrawing: false,
        activePolygon: null,
      };

    default:
      return state;
  }
}
