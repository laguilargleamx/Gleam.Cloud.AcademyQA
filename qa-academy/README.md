# QA Academy

Plataforma para exámenes y seguimiento de Diana en su aprendizaje de QA.

## Stack
- **Backend:** Python + FastAPI (contenedor en Cloud Run)
- **BD:** PostgreSQL (Cloud SQL)
- **Frontend:** React + Vite

---

## 🚀 Deploy del Backend en Google Cloud Run

### 1. Requisitos
- Tener `gcloud` CLI instalado y autenticado (`gcloud auth login`)
- Un proyecto de GCP creado, con billing habilitado
- Una instancia de Cloud SQL (PostgreSQL) creada, o cualquier `DATABASE_URL` accesible

### 2. Build y deploy
Desde la carpeta `backend/`:

```bash
gcloud run deploy qa-academy-backend \
  --source . \
  --region us-central1 \
  --allow-unauthenticated \
  --set-env-vars DATABASE_URL="postgresql://user:password@/db?host=/cloudsql/PROYECTO:REGION:INSTANCIA"
```

`gcloud run deploy --source .` construye la imagen con el `Dockerfile` incluido y la publica directamente, sin necesidad de Artifact Registry manual.

### 3. Conectar Cloud SQL
Si usas Cloud SQL, agrega la instancia al servicio:

```bash
gcloud run services update qa-academy-backend \
  --add-cloudsql-instances PROYECTO:REGION:INSTANCIA
```

### 4. Obtener tu URL
Cloud Run te da una URL tipo:
```
https://qa-academy-backend-xxxxx-uc.a.run.app
```

---

## 🌐 Frontend (React + Vite)

### Desarrollo local
```bash
cd frontend
npm install
cp .env.example .env   # ajusta VITE_API_URL si tu backend no corre en localhost:8000
npm run dev
```

### Build de producción
```bash
cd frontend
npm run build
```
Esto genera la carpeta `frontend/dist/` lista para servirse desde cualquier hosting estático (Firebase Hosting, Cloud Storage + CDN, etc.). Antes de buildear, define `VITE_API_URL` en `.env` con la URL real de tu backend en Cloud Run.

---

## 💻 Desarrollo Local (Backend)

```bash
cd backend
pip install -r requirements.txt

# Crea un archivo .env con:
# DATABASE_URL=postgresql://user:password@localhost/qaacademy

uvicorn app.main:app --reload
```

Accede a la documentación automática en: http://localhost:8000/docs

---

## 📋 Endpoints principales

| Método | Ruta | Descripción |
|--------|------|-------------|
| GET | `/exams` | Lista de exámenes disponibles |
| GET | `/exams/modulo1` | Obtiene el examen (sin respuestas) |
| POST | `/exams/modulo1/submit` | Entrega el examen |
| GET | `/admin/results` | Todos los resultados |
| GET | `/admin/results/{id}` | Detalle de un resultado |

---

## 🗺 Roadmap

- [x] Módulo 1 – Examen de Fundamentos y Git
- [ ] Login para Gerardo (admin) y Diana (alumna)
- [ ] Módulo 2 – Bug Tracker (levantar y gestionar bugs)
- [ ] Panel admin con gráficas de progreso
- [ ] Soporte para múltiples módulos dinámicos
