import { useState } from 'react';
import MainLayout from '../components/layout/MainLayout';
import ProspectacionModule from '../modules/prospectacion/ProspectacionModule';
import TerritoriesModule from '../modules/territories/TerritoriesModule';
import { ComingSoon, Deprecated, Maintenance, NotFound } from '../system-pages';

export default function App() {
  const [selectedTool, setSelectedTool] = useState('map');

  const views = {
    map: <ProspectacionModule />,
    territories: <TerritoriesModule />,
    reports: <ComingSoon moduleName="Reportes" />,
    coverage: <ComingSoon moduleName="Cobertura" />,
    analytics: <ComingSoon moduleName="Analítica" />,

    maintenance: <Maintenance />,
    deprecated: <Deprecated />,
  };
  return (
    <MainLayout selectedTool={selectedTool} onSelectTool={setSelectedTool}>
      {views[selectedTool] ?? <NotFound />}
    </MainLayout>
  );
}
