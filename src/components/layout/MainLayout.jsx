import Sidebar from './Sidebar';

export default function MainLayout({ selectedTool, onSelectTool, children }) {
  return (
    <div className="layout-shell">
      <Sidebar selectedTool={selectedTool} onSelectTool={onSelectTool} />

      <main className="workspace">{children}</main>
    </div>
  );
}
