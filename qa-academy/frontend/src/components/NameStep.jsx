import { useState } from 'react';

export default function NameStep({ onStart }) {
  const [name, setName] = useState('');

  const handleStart = () => onStart(name.trim());

  return (
    <div className="step-name">
      <div className="hero-badge">Módulo 1</div>
      <h1>Examen de<br />Fundamentos y Git</h1>
      <p>Ingresa tu nombre para comenzar. Tienes 16 preguntas de opción múltiple.</p>
      <div className="name-input-row">
        <input
          type="text"
          placeholder="Tu nombre completo"
          autoComplete="off"
          value={name}
          onChange={(e) => setName(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleStart()}
        />
        <button className="btn btn-primary" onClick={handleStart}>Comenzar →</button>
      </div>
    </div>
  );
}
