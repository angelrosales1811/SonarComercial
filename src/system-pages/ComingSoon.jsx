import SystemPage from './SystemPage';
import comingSoonGif from './assets/coming-soon.gif';

export default function ComingSoon({ moduleName }) {
  return (
    <SystemPage
      title="Próximamente"
      moduleName={moduleName}
      message="Estamos trabajando en esta funcionalidad."
      image={comingSoonGif}
    />
  );
}
