import { useRef, useState } from 'react';
import * as XLSX from 'xlsx';

import { importClients } from '../../../services/excelImport.service';
import { mapExcelRow } from '../../../utils/clientMapper';
import { clientToMapClient } from '../../../utils/clientToMapClient';
import { generateConvexHull } from '../../../utils/convexHull';

export function useProspectacion() {
  const [clients, setClients] = useState([]);
  const [polygonClients, setPolygonClients] = useState(null);
  const [prospects, setProspects] = useState([]);
  const [visibleProspects, setVisibleProspects] = useState([]);
  const [prospectMode, setProspectMode] = useState('PROSPECTS');
  const [showExamplesMenu, setShowExamplesMenu] = useState(false);
  const menuRef = useRef(null);

  function downloadTemplate(type) {
    const link = document.createElement('a');

    if (type === 1) {
      link.href = '/templates/Formato_excel_clientes.xlsx';
      link.download = 'Formato_excel_clientes.xlsx';
    } else {
      link.href = '/templates/Formato_excel_prospectos.xlsx';
      link.download = 'Formato_excel_prospectos.xlsx';
    }

    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

  function clearMap() {
    setClients([]);
    setProspects([]);
    setVisibleProspects([]);
    setPolygonClients(null);
  }

  function generatePolygon() {
    const hull = generateConvexHull(clients);

    if (!hull) {
      alert('Se requieren al menos 3 clientes');
      return;
    }

    setPolygonClients(hull);
  }

  async function loadData(event, setter, generateHull = false) {
    setProspectMode('PROSPECTS');

    const file = event.target.files?.[0];

    if (!file) return;

    try {
      if (generateHull) {
        // Clientes
        setClients([]);
        setPolygonClients(null);
      } else {
        // Prospectos
        setProspects([]);
        setVisibleProspects([]);
      }

      const rows = await importClients(file);

      const mappedData = rows.map(mapExcelRow).map(clientToMapClient);

      setter(mappedData);

      if (generateHull) {
        const hull = generateConvexHull(mappedData);

        if (hull) {
          setPolygonClients(hull);
        }
      }

      event.target.value = '';
    } catch (error) {
      console.error(error);
    }
  }
  function exportVisibleProspects() {
    if (!visibleProspects.length) {
      alert('No hay prospectos para exportar');
      return;
    }

    const rows = visibleProspects.map((prospect) => ({
      id: prospect.id,
      name: prospect.name,
      lat: prospect.position[0],
      lng: prospect.position[1],
      c1: prospect.attributes?.c1 ?? '',
      c2: prospect.attributes?.c2 ?? '',
      c3: prospect.attributes?.c3 ?? '',
      c4: prospect.attributes?.c4 ?? '',
      c5: prospect.attributes?.c5 ?? '',
      c6: prospect.attributes?.c6 ?? '',
    }));

    const worksheet = XLSX.utils.json_to_sheet(rows);

    const workbook = XLSX.utils.book_new();

    XLSX.utils.book_append_sheet(workbook, worksheet, 'Prospectos');

    XLSX.writeFile(workbook, 'Prospectos_Visibles.xlsx');
  }
  return {
    clients,
    setClients,

    prospects,
    setProspects,

    visibleProspects,
    setVisibleProspects,

    polygonClients,
    setPolygonClients,

    prospectMode,
    setProspectMode,

    showExamplesMenu,

    setShowExamplesMenu,
    downloadTemplate,
    clearMap,
    generatePolygon,
    loadData,
    exportVisibleProspects,
    menuRef,
  };
}
