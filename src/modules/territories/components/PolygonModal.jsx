import { useEffect, useState } from 'react';
import { FiX } from 'react-icons/fi';
import { PiPolygon } from 'react-icons/pi';

export default function PolygonModal({
  isOpen,
  onClose,
  onSave,
  initialName = '',
  initialColor = '',
  mode = 'create',
}) {
  const [name, setName] = useState('');
  const [color, setColor] = useState('');

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    if (mode === 'edit') {
      setName(initialName);
      setColor(initialColor);
      return;
    }

    setName(generateRandomName());
    setColor(generateRandomColor());
  }, [isOpen, mode, initialName, initialColor]);

  if (!isOpen) {
    return null;
  }

  const TERRITORY_COLORS = [
    '#2196f3',
    '#00bcd4',
    '#4caf50',
    '#8bc34a',
    '#ffc107',
    '#ff9800',
    '#f44336',
    '#e91e63',
    '#9c27b0',
    '#673ab7',
  ];

  function generateRandomColor() {
    const randomIndex = Math.floor(Math.random() * TERRITORY_COLORS.length);

    return TERRITORY_COLORS[randomIndex];
  }

  const handleSave = () => {
    if (!name.trim()) {
      return;
    }

    onSave({
      name,
      color,
    });

    // setName(generateRandomName());
    // setColor(generateRandomColor());
  };

  function generateRandomName() {
    const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ123456789';

    return Array.from({ length: 8 }, () => chars[Math.floor(Math.random() * chars.length)]).join(
      ''
    );
  }

  return (
    <div className="polygon-modal-backdrop">
      <div className="polygon-modal">
        <div className="polygon-modal-header">
          <h2>
            <PiPolygon />
            {mode === 'edit' ? 'Editar Polígono' : 'Nuevo Polígono'}
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
            {mode === 'edit' ? 'Guardar Cambios' : 'Crear Polígono'}
          </button>
        </div>
      </div>
    </div>
  );
}
