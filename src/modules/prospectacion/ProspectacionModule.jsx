import ProspectacionMap from './components/ProspectacionMap';
import ProspectacionToolbar from './components/ProspectacionToolbar';
import ProspectionConsole from './components/ProspectionConsole';
import { ProspectacionProvider } from './context/ProspectacionContext';
import { useProspectacion } from './hooks/useProspectacion';

export default function ProspectacionModule() {
  const actions = useProspectacion();

  return (
    <ProspectacionProvider value={actions}>
      <ProspectacionMap />

      <div className="prospectacion-overlay">
        <ProspectacionToolbar />

        <ProspectionConsole />
      </div>
    </ProspectacionProvider>
  );
}
