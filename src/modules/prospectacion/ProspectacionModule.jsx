import ProspectacionMap from './components/ProspectacionMap';
import ProspectacionToolbar from './components/ProspectacionToolbar';
import ProspectionConsole from './components/ProspectionConsole';

import { ProspectacionProvider } from './context/ProspectacionProvider';

export default function ProspectacionModule() {
  return (
    <ProspectacionProvider>
      <ProspectacionMap />

      <div className="prospectacion-overlay">
        <ProspectacionToolbar />
        <ProspectionConsole />
      </div>
    </ProspectacionProvider>
  );
}
