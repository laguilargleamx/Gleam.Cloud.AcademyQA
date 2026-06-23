import { useEffect, useState } from 'react';
import { getAdminResults, getAdminResultDetail } from '../api';
import ResultDetailModal from './ResultDetailModal';

export default function AdminPage({ onError }) {
  const [results, setResults] = useState(null);
  const [error, setError] = useState(false);
  const [detail, setDetail] = useState(null);

  useEffect(() => {
    let active = true;
    setResults(null);
    setError(false);
    getAdminResults()
      .then((data) => active && setResults(data))
      .catch(() => active && setError(true));
    return () => { active = false; };
  }, []);

  const viewDetail = async (id) => {
    try {
      const r = await getAdminResultDetail(id);
      setDetail(r);
    } catch {
      onError('No se pudo cargar el detalle');
    }
  };

  return (
    <div>
      <div className="admin-header">
        <h2>Panel de Resultados</h2>
        <p>Todos los exámenes entregados por Diana</p>
      </div>
      <div className="table-wrap">
        {results === null && !error && <div className="loading">Cargando resultados…</div>}
        {error && (
          <div className="empty-state">
            <div className="empty-icon">⚠️</div>
            <p>No se pudo conectar con el servidor</p>
          </div>
        )}
        {results && results.length === 0 && (
          <div className="empty-state">
            <div className="empty-icon">📭</div>
            <p>Aún no hay exámenes entregados</p>
          </div>
        )}
        {results && results.length > 0 && (
          <table className="results-table">
            <thead>
              <tr>
                <th>#</th>
                <th>Estudiante</th>
                <th>Examen</th>
                <th>Calificación</th>
                <th>Estado</th>
                <th>Fecha</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {results.map((r) => {
                const pct = Math.round((r.score / r.total_points) * 100);
                const pass = pct >= 70;
                const date = new Date(r.submitted_at).toLocaleString('es-MX', {
                  dateStyle: 'medium',
                  timeStyle: 'short',
                });
                return (
                  <tr key={r.id}>
                    <td style={{ color: 'var(--muted)' }}>#{r.id}</td>
                    <td><strong>{r.student_name}</strong></td>
                    <td style={{ color: 'var(--muted)', fontSize: '.85rem' }}>{r.exam_title}</td>
                    <td>{r.score}/{r.total_points} <span style={{ color: 'var(--muted)', fontSize: '.82rem' }}>({pct}%)</span></td>
                    <td><span className={`badge ${pass ? 'badge-success' : 'badge-danger'}`}>{pass ? 'Aprobado' : 'Reprobado'}</span></td>
                    <td style={{ color: 'var(--muted)', fontSize: '.82rem' }}>{date}</td>
                    <td>
                      <button
                        className="btn btn-outline"
                        style={{ padding: '.35rem .9rem', fontSize: '.8rem' }}
                        onClick={() => viewDetail(r.id)}
                      >
                        Ver
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
      </div>
      <ResultDetailModal result={detail} onClose={() => setDetail(null)} />
    </div>
  );
}
