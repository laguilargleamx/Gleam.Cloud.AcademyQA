export default function NameStep({ name, onStart }) {
  return (
    <div className="step-name">
      <div className="hero-badge">Módulo 1</div>
      <h1>Examen de<br />Fundamentos y Git</h1>
      <p>Hola, {name}. Tienes 16 preguntas de opción múltiple.</p>
      <button className="btn btn-primary" onClick={onStart}>Comenzar →</button>
    </div>
  );
}
