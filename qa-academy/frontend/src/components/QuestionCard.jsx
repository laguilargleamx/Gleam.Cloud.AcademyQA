import FormattedText from './FormattedText';

export default function QuestionCard({ question, qNumber, selectedKey, onSelect }) {
  return (
    <div className="question-card">
      <div className="question-number">Pregunta {qNumber} · {question.points} pts</div>
      <div className="question-text"><FormattedText text={question.text} /></div>
      <div className="options">
        {question.options.map((opt) => (
          <label
            key={opt.key}
            className={`option-label ${selectedKey === opt.key ? 'selected' : ''}`}
            onClick={() => onSelect(opt.key)}
          >
            <input type="radio" name={`q${question.id}`} value={opt.key} checked={selectedKey === opt.key} readOnly />
            <span className="option-key">{opt.key}</span>
            <span>{opt.text}</span>
          </label>
        ))}
      </div>
    </div>
  );
}
