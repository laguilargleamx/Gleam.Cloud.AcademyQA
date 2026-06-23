export const API = import.meta.env.VITE_API_URL || 'http://localhost:8000';

const AUTH_KEY = 'qa_academy_auth';

export function getAuth() {
  const raw = sessionStorage.getItem(AUTH_KEY);
  return raw ? JSON.parse(raw) : null;
}

export function setAuth(auth) {
  if (auth) sessionStorage.setItem(AUTH_KEY, JSON.stringify(auth));
  else sessionStorage.removeItem(AUTH_KEY);
}

async function authFetch(path, options = {}) {
  const auth = getAuth();
  const res = await fetch(`${API}${path}`, {
    ...options,
    headers: {
      ...(options.headers || {}),
      ...(auth ? { Authorization: `Bearer ${auth.token}` } : {}),
    },
  });
  if (res.status === 401) {
    setAuth(null);
    throw new Error('Sesión expirada, vuelve a iniciar sesión');
  }
  return res;
}

export async function login(username, password) {
  const res = await fetch(`${API}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, password }),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.detail || 'Usuario o contraseña incorrectos');
  setAuth(data);
  return data;
}

export function logout() {
  setAuth(null);
}

export async function getExam(examId) {
  const res = await authFetch(`/exams/${examId}`);
  if (!res.ok) throw new Error('No se pudo conectar con el servidor');
  return res.json();
}

export async function submitExam(examId, studentName, answers) {
  const res = await authFetch(`/exams/${examId}/submit`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ student_name: studentName, exam_id: examId, answers }),
  });
  if (!res.ok) throw new Error('Error al entregar el examen');
  return res.json();
}

export async function getAdminResults() {
  const res = await authFetch('/admin/results');
  if (!res.ok) throw new Error('No se pudo conectar con el servidor');
  return res.json();
}

export async function getAdminResultDetail(id) {
  const res = await authFetch(`/admin/results/${id}`);
  if (!res.ok) throw new Error('No se pudo cargar el detalle');
  return res.json();
}
