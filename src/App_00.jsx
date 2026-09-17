
export default function App(){
 return (
 <>
 <header className="app-header">
 <div><div className="badge">GEOMETRÍA COMPUTACIONAL</div><h1>Envolvente Convexo</h1></div>
 <button className="example-btn">📁 Ejemplo</button>
 </header>
 <main className="main-container">
 <div id="map"><div className="map-placeholder"><h2>🗺️ Mapa</h2><p>Aquí se renderizará Google Maps, Leaflet o Mapbox</p></div></div>
 <div className="stats-card"><h3>Resumen</h3><div className="stat"><span>Clientes</span><strong>154</strong></div><div className="stat"><span>Vértices</span><strong>12</strong></div><div className="stat"><span>Área</span><strong>248 km²</strong></div></div>
 <div className="bottom-console">
 <input type="file" className="file-input" />
 <div className="actions"><button className="btn primary">Generar Polígono</button><button className="btn secondary">Descargar CSV</button></div>
 </div>
 </main>
 </>
 )}
