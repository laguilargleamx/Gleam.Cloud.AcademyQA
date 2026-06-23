import FormattedText from './FormattedText';

export default function ResultStep({ resultData, examData, onReset }) {
  const pct = resultData.percentage;
  const pass = pct >= 70;

  let qGlobal = 0;

  return (
    <div>
      <div className="result-hero">
        <div className={`score-ring ${pass ? 'pass' : 'fail'}`}>
          <span className={`score-pct ${pass ? 'pass' : 'fail'}`}>{pct}%</span>
          <span className="score-label">{resultData.score} / {resultData.total_points} pts</span>
        </div>
        <h2>{pass ? '¡Felicidades, Diana! 🎉' : 'Sigue practicando 💪'}</h2>
        <p>
          {pass
            ? 'Pasaste el examen del Módulo 1. ¡Muy buen trabajo!'
            : 'No alcanzaste el puntaje mínimo (70%). Revisa los temas y vuelve a intentarlo.'}
        </p>
      </div>
      <div className="result-detail">
        <div className="section-title">Revisión de respuestas</div>
        {examData.sections.map((section) =>
          section.questions.map((q) => {
            qGlobal++;
            const d = resultData.detail.find((x) => x.question_id === q.id);
            const correct = d && d.is_correct;
            return (
              <div className="detail-item" key={q.id}>
                <div className={`detail-icon ${correct ? 'correct' : 'wrong'}`}>{correct ? '✓' : '✗'}</div>
                <div className="detail-body">
                  <div className="detail-q">{qGlobal}. <FormattedText text={q.text} /></div>
                  <div className="detail-ans">
                    {!correct && <span className="wrong-ans">Tu respuesta: {d ? d.selected : '—'} · </span>}
                    <span className="correct-ans">Correcta: {q.answer || (d && d.correct_answer)}</span>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>
      <div style={{ textAlign: 'center', marginTop: '2rem' }}>
        <button className="btn btn-outline" onClick={onReset}>← Volver al inicio</button>
      </div>
    </div>
  );
}
