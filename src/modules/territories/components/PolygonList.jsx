import { useState } from 'react';
import { PiPolygonThin } from 'react-icons/pi';
import { useTerritoriesContext } from '../context/TerritoriesContext';

import './PolygonList.css';

export default function PolygonList() {
  const { state, movePolygonToTop } = useTerritoriesContext();

  const [pinned, setPinned] = useState(false);
  const [hovered, setHovered] = useState(false);

  const expanded = pinned || hovered;

  if (state.polygons.length === 0) {
    return null;
  }

  return (
    <div
      className={`polygon-list ${expanded ? 'expanded' : ''}`}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div className="polygon-list-header">
        <button
          className={`pin-btn ${pinned ? 'active' : ''}`}
          onClick={(e) => {
            e.stopPropagation();
            setPinned(!pinned);
          }}
          title={pinned ? 'Desanclar' : 'Fijar'}
        >
          <PiPolygonThin size={18} />
        </button>
        <span>({state.polygons.length})</span>
      </div>

      <div className="polygon-list-body">
        {state.polygons.map((polygon, index) => (
          <div
            key={polygon.id}
            className={`polygon-item ${
              polygon.id === state.topPolygonId ? 'polygon-item-selected' : ''
            }`}
            onClick={() => movePolygonToTop(polygon.id)}
          >
            <div className="polygon-info">
              <div
                className="polygon-color"
                style={{
                  background: polygon.color,
                }}
              />

              <span className="polygon-name">{polygon.name}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
