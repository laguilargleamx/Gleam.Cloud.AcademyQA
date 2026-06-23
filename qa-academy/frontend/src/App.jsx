import { useRef, useState } from 'react';
import { getAuth, getExam, logout, submitExam } from './api';
import Header from './components/Header';
import Toast from './components/Toast';
import Login from './components/Login';
import NameStep from './components/NameStep';
import ExamStep from './components/ExamStep';
import ResultStep from './components/ResultStep';
import AdminPage from './components/AdminPage';

const EXAM_ID = 'modulo1';

export default function App() {
  const [auth, setAuth] = useState(getAuth());
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

  const handleLogout = () => {
    logout();
    setAuth(null);
    setStep('name');
    setExamData(null);
    setStudentName('');
    setUserAnswers({});
    setResultData(null);
  };

  const startExam = async () => {
    try {
      const data = await getExam(EXAM_ID);
      setExamData(data);
      setStudentName(auth.display_name);
      setStep('exam');
    } catch (e) {
      showToast(e.message || 'No se pudo conectar con el servidor');
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
    } catch (e) {
      showToast(e.message || 'Error al entregar el examen. Intenta de nuevo.');
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
      <Header username={auth?.username} onLogout={handleLogout} />
      <main>
        {!auth && <Login onLogin={setAuth} onError={showToast} />}
        {auth?.role === 'student' && (
          <>
            {step === 'name' && <NameStep name={auth.display_name} onStart={startExam} />}
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
        {auth?.role === 'admin' && <AdminPage onError={showToast} />}
      </main>
      <Toast message={toast} />
    </>
  );
}
