export const API = import.meta.env.VITE_API_URL || 'http://localhost:8000';

export async function getExam(examId) {
  const res = await fetch(`${API}/exams/${examId}`);
  if (!res.ok) throw new Error('No se pudo conectar con el servidor');
  return res.json();
}

export async function submitExam(examId, studentName, answers) {
  const res = await fetch(`${API}/exams/${examId}/submit`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ student_name: studentName, exam_id: examId, answers }),
  });
  if (!res.ok) throw new Error('Error al entregar el examen');
  return res.json();
}

export async function getAdminResults() {
  const res = await fetch(`${API}/admin/results`);
  if (!res.ok) throw new Error('No se pudo conectar con el servidor');
  return res.json();
}

export async function getAdminResultDetail(id) {
  const res = await fetch(`${API}/admin/results/${id}`);
  if (!res.ok) throw new Error('No se pudo cargar el detalle');
  return res.json();
}
