import { useRef, useState } from 'react';
import { getExam, submitExam } from './api';
import Header from './components/Header';
import Toast from './components/Toast';
import NameStep from './components/NameStep';
import ExamStep from './components/ExamStep';
import ResultStep from './components/ResultStep';
import AdminPage from './components/AdminPage';

const EXAM_ID = 'modulo1';

export default function App() {
  const [page, setPage] = useState('exam');
  const [step, setStep] = useState('name');
  const [examData, setExamData] = useState(null);
  const [studentName, setStudentName] = useState('');
  const [userAnswers, setUserAnswers] = useState({});
  const [resultData, setResultData] = useState(null);
  const [showUnansweredWarning, setShowUnansweredWarning] = useState(false);
  const [toast, setToast] = useState(null);
  const toastTimer = useRef(null);

  const showToast = (msg) => {
    setToast(msg);
    clearTimeout(toastTimer.current);
    toastTimer.current = setTimeout(() => setToast(null), 3000);
  };

  const startExam = async (name) => {
    if (!name) { showToast('Escribe tu nombre para continuar'); return; }
    try {
      const data = await getExam(EXAM_ID);
      setExamData(data);
      setStudentName(name);
      setStep('exam');
    } catch {
      showToast('No se pudo conectar con el servidor');
    }
  };

  const selectOption = (qId, key) => {
    setUserAnswers((prev) => ({ ...prev, [qId]: key }));
  };

  const totalQuestions = () => examData.sections.reduce((sum, s) => sum + s.questions.length, 0);

  const handleSubmit = async () => {
    const total = totalQuestions();
    if (Object.keys(userAnswers).length < total) {
      setShowUnansweredWarning(true);
      return;
    }

    const answers = Object.entries(userAnswers).map(([id, selected]) => ({
      question_id: parseInt(id, 10),
      selected,
    }));

    try {
      const data = await submitExam(EXAM_ID, studentName, answers);
      setResultData(data);
      setStep('result');
    } catch {
      showToast('Error al entregar el examen. Intenta de nuevo.');
    }
  };

  const resetExam = () => {
    setUserAnswers({});
    setStudentName('');
    setExamData(null);
    setResultData(null);
    setShowUnansweredWarning(false);
    setStep('name');
  };

  return (
    <>
      <Header page={page} onNavigate={setPage} />
      <main>
        {page === 'exam' && (
          <>
            {step === 'name' && <NameStep onStart={startExam} />}
            {step === 'exam' && examData && (
              <ExamStep
                examData={examData}
                studentName={studentName}
                userAnswers={userAnswers}
                onSelectOption={selectOption}
                onSubmit={handleSubmit}
                showUnansweredWarning={showUnansweredWarning}
              />
            )}
            {step === 'result' && resultData && (
              <ResultStep resultData={resultData} examData={examData} onReset={resetExam} />
            )}
          </>
        )}
        {page === 'admin' && <AdminPage onError={showToast} />}
      </main>
      <Toast message={toast} />
    </>
  );
}
