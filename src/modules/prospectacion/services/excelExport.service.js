import * as XLSX from 'xlsx';

export function exportProspects(prospects) {
  const rows = prospects.map((prospect) => ({
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
