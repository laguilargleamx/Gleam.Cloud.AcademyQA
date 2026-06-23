export default function ResultDetailModal({ result, onClose }) {
  if (!result) return null;

  const pct = Math.round((result.score / result.total_points) * 100);
  const pass = pct >= 70;
  const correctCount = result.answers.filter((a) => a.is_correct).length;
  const submittedAt = new Date(result.submitted_at).toLocaleString('es-MX', {
    dateStyle: 'long',
    timeStyle: 'short',
  });

  return (
    <div className="modal-overlay" onClick={(e) => e.target === e.currentTarget && onClose()}>
      <div className="modal">
        <div className="modal-header">
          <h3>{result.student_name} – {result.exam_title}</h3>
          <button className="btn-close" onClick={onClose}>✕</button>
        </div>
        <p className="modal-meta">Entregado el {submittedAt}</p>
        <div className="modal-stats">
          <div className="modal-stat">
            <div className={`modal-stat-value ${pass ? 'pass' : 'fail'}`}>{pct}%</div>
            <div className="modal-stat-label">{result.score}/{result.total_points} pts</div>
          </div>
          <div className="modal-stat">
            <div className="modal-stat-value">{correctCount}</div>
            <div className="modal-stat-label">Correctas de {result.answers.length}</div>
          </div>
        </div>
        <div className="modal-answers">
          {result.answers.map((a, i) => (
            <div className="detail-item" key={i}>
              <div className={`detail-icon ${a.is_correct ? 'correct' : 'wrong'}`}>{a.is_correct ? '✓' : '✗'}</div>
              <div className="detail-body">
                <div style={{ fontSize: '.82rem', color: 'var(--muted)' }}>Pregunta {i + 1}</div>
                <div style={{ fontSize: '.85rem' }}>
                  Respuesta: <strong>{a.selected}</strong>
                  {!a.is_correct && <> · <span style={{ color: 'var(--success)' }}>Correcta: {a.correct_answer}</span></>}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
