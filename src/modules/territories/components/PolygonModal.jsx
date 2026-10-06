import { useState } from 'react';

export default function PolygonModal({ isOpen, onClose, onSave }) {
  const [name, setName] = useState('');
  const [color, setColor] = useState('#2196f3');

  if (!isOpen) return null;

  const handleSave = () => {
    console.log('SAVE', {
      name,
      color,
    });

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
    <div className="modal-backdrop">
      <div className="modal-card">
        <h2>Nuevo Polígono</h2>

        <input
          type="text"
          placeholder="Nombre"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <input type="color" value={color} onChange={(e) => setColor(e.target.value)} />

        <button onClick={handleSave}>Crear</button>

        <button onClick={onClose}>Cancelar</button>
      </div>
    </div>
  );
}
