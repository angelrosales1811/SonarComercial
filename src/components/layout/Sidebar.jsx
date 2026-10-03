import { useEffect, useState } from 'react';
import { FiFileText, FiLayers, FiMap, FiPieChart, FiTarget } from 'react-icons/fi';
import { PiPushPin, PiPushPinFill } from 'react-icons/pi';
import './Sidebar.css';

export default function Sidebar({ selectedTool, onSelectTool }) {
  const [collapsed, setCollapsed] = useState(false);
  const [pinned, setPinned] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (!pinned) {
        setCollapsed(true);
      }
    }, 3000);

    return () => clearTimeout(timer);
  }, [pinned]);

  useEffect(() => {
    document.documentElement.style.setProperty('--sidebar-width', collapsed ? '64px' : '260px');
  }, [collapsed]);

  const items = [
    {
      id: 'map',
      label: 'Mapa',
      icon: FiMap,
    },
    {
      id: 'territories',
      label: 'Territorios',
      icon: FiLayers,
    },
    {
      id: 'reports',
      label: 'Reportes',
      icon: FiFileText,
    },
    {
      id: 'coverage',
      label: 'Cobertura',
      icon: FiTarget,
    },
    {
      id: 'analytics',
      label: 'Analítica',
      icon: FiPieChart,
    },
  ];

  return (
    <aside
      className={`sidebar ${collapsed ? 'collapsed' : ''}`}
      onMouseEnter={() => {
        if (!pinned) {
          setCollapsed(false);
        }
      }}
      onMouseLeave={() => {
        if (!pinned) {
          setCollapsed(true);
        }
      }}
    >
      <div className="sidebar-header">
        <button
          className={`sidebar-pin ${pinned ? 'active' : ''}`}
          onClick={() => {
            const nextPinned = !pinned;

            setPinned(nextPinned);

            if (!nextPinned) {
              setCollapsed(true);
            } else {
              setCollapsed(false);
            }
          }}
        >
          {pinned ? <PiPushPinFill /> : <PiPushPin />}
        </button>

        {!collapsed && <h2 className="logo-title">SONAR</h2>}
      </div>

      <div className="sidebar-logo">
        {!collapsed && <span className="logo-tag">ECOLOCALIZACION COMERCIAL</span>}
      </div>

      <nav>
        {items.map((item) => {
          const Icon = item.icon;

          return (
            <button
              key={item.id}
              className={`sidebar-item ${selectedTool === item.id ? 'active' : ''}`}
              onClick={() => onSelectTool(item.id)}
            >
              <Icon />
              {!collapsed && <span>{item.label}</span>}
            </button>
          );
        })}
      </nav>
    </aside>
  );
}
