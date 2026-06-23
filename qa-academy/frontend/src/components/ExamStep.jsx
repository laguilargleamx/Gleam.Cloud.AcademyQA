import QuestionCard from './QuestionCard';

export default function ExamStep({ examData, studentName, userAnswers, onSelectOption, onSubmit, showUnansweredWarning }) {
  const total = examData.sections.reduce((sum, s) => sum + s.questions.length, 0);
  const answered = Object.keys(userAnswers).length;
  const pct = Math.round((answered / total) * 100);

  let qGlobal = 0;

  return (
    <div>
      <div className="exam-meta">
        <h2>{examData.title}</h2>
        <p>Estudiante: {studentName}</p>
        <div className="progress-bar-wrap">
          <div className="progress-bar-fill" style={{ width: `${pct}%` }} />
        </div>
        <p className="progress-label">{answered} de {total} contestadas</p>
      </div>
      <div>
        {examData.sections.map((section) => (
          <div key={section.title}>
            <div className="section-title">{section.title}</div>
            {section.questions.map((q) => {
              qGlobal++;
              return (
                <QuestionCard
                  key={q.id}
                  question={q}
                  qNumber={qGlobal}
                  selectedKey={userAnswers[q.id]}
                  onSelect={(key) => onSelectOption(q.id, key)}
                />
              );
            })}
          </div>
        ))}
      </div>
      <div className="submit-area">
        {showUnansweredWarning && (
          <span className="unanswered-warning">⚠️ Hay preguntas sin contestar</span>
        )}
        <button className="btn btn-primary" style={{ marginLeft: 'auto' }} onClick={onSubmit}>
          Entregar examen →
        </button>
      </div>
    </div>
  );
}
