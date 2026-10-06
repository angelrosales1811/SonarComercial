import { useState } from 'react';
import { FiX } from 'react-icons/fi';
import { PiPolygon } from 'react-icons/pi';

export default function PolygonModal({ isOpen, onClose, onSave }) {
  const [name, setName] = useState('');
  const [color, setColor] = useState('#2196f3');

  if (!isOpen) return null;

  const handleSave = () => {
    if (!name.trim()) {
      return;
    }

    onSave({
      name,
      color,
    });

    setName('');
    setColor('#2196f3');
  };

  return (
    <div className="polygon-modal-backdrop">
      <div className="polygon-modal">
        <div className="polygon-modal-header">
          <h2>
            <PiPolygon />
            Nuevo Polígono
          </h2>

          <button className="polygon-modal-close" onClick={onClose}>
            <FiX />
          </button>
        </div>

        <div className="polygon-modal-body">
          <label>Nombre del territorio</label>

          <input
            type="text"
            placeholder="Ej. Mexico Norte"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <label>Color</label>

          <div className="color-picker-wrapper">
            <input type="color" value={color} onChange={(e) => setColor(e.target.value)} />

            <span>{color}</span>
          </div>
        </div>

        <div className="polygon-modal-footer">
          <button className="btn btn-secondary" onClick={onClose}>
            Cancelar
          </button>

          <button className="btn btn-primary" onClick={handleSave}>
            Crear Polígono
          </button>
        </div>
      </div>
    </div>
  );
}
