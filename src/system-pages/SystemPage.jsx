import './SystemPage.css';

export default function SystemPage({ title, moduleName, message, image }) {
  return (
    <div className="system-page">
      <div className="system-page-card">
        <img src={image} alt={title} className="system-page-image" />

        {moduleName && <span className="system-page-module">{moduleName}</span>}

        <h1>{title}</h1>

        <p>{message}</p>
      </div>
    </div>
  );
}
