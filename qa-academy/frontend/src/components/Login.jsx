import { useState } from 'react';
import { login } from '../api';

export default function Login({ onLogin, onError }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!username || !password) { onError('Escribe usuario y contraseña'); return; }
    setLoading(true);
    try {
      const auth = await login(username, password);
      onLogin(auth);
    } catch (e) {
      onError(e.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="step-name">
      <div className="hero-badge">QA Academy</div>
      <h1>Iniciar sesión</h1>
      <p>Ingresa tu usuario y contraseña para continuar.</p>
      <div className="name-input-row" style={{ flexDirection: 'column', gap: '.75rem' }}>
        <input
          type="text"
          placeholder="Usuario"
          autoComplete="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSubmit()}
        />
        <input
          type="password"
          placeholder="Contraseña"
          autoComplete="current-password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSubmit()}
        />
        <button className="btn btn-primary" onClick={handleSubmit} disabled={loading}>
          {loading ? 'Entrando…' : 'Entrar →'}
        </button>
      </div>
    </div>
  );
}
