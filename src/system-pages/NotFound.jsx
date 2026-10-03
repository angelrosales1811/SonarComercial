import SystemPage from './SystemPage';
import notFoundGif from './assets/not-found.gif';

export default function NotFound() {
  return <SystemPage title="404" message="La página solicitada no existe." image={notFoundGif} />;
}
