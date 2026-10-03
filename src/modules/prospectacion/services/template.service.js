export function downloadTemplate(type) {
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
