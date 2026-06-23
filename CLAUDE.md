# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project overview

QA Academy is a small platform for delivering QA exams and tracking a single student's progress. It lives entirely under `qa-academy/`, split into `backend/` (FastAPI) and `frontend/` (React + Vite).

## Commands

### Frontend (`qa-academy/frontend/`)
```bash
npm install
cp .env.example .env      # set VITE_API_URL if the backend isn't on localhost:8000
npm run dev                # Vite dev server on :5173
npm run build               # production build -> dist/
npm run lint                  # ESLint (flat config in eslint.config.js)
npm run preview                # serve the built dist/ locally
```
There is no test suite for the frontend.

### Backend (`qa-academy/backend/`)
```bash
python -m venv .venv
.venv/Scripts/python.exe -m pip install -r requirements.txt   # POSIX: .venv/bin/python
uvicorn app.main:app --reload --port 8000
```
The app entrypoint is `app.main:app`, not `main:app` — the backend was refactored from a single `main.py` into the `app/` package. API docs are auto-served at `/docs`. There is no test suite for the backend.

`DATABASE_URL` defaults to `postgresql://user:password@localhost/qaacademy` (see `app/database.py`) if unset. For local work, the quickest way to satisfy that default is a throwaway container:
```bash
docker run -d --name qa-academy-postgres -e POSTGRES_USER=user -e POSTGRES_PASSWORD=password -e POSTGRES_DB=qaacademy -p 5432:5432 postgres:16
```

### Deployment
- Backend ships as a container (`backend/Dockerfile`) to Cloud Run: `gcloud run deploy --source .` from `backend/`. It listens on `$PORT` (Cloud Run sets this; defaults to 8080 locally). Cloud SQL instances are attached via `gcloud run services update --add-cloudsql-instances`.
- Frontend is a static build (`npm run build` -> `dist/`) deployed to any static host (Firebase Hosting, Cloud Storage, etc.); `VITE_API_URL` must point at the deployed backend URL at build time since Vite inlines env vars.

## Architecture

### Backend
- `app/main.py` — creates the FastAPI app, adds permissive CORS (`allow_origins=["*"]`), runs `Base.metadata.create_all` on startup, and mounts the routers.
- `app/database.py` — SQLAlchemy engine/session/`Base`/`get_db` dependency.
- `app/models.py` — single table, `ExamResult`: one row per submitted exam, with the per-question grading detail stored as a JSON blob (`answers` column) rather than normalized rows.
- `app/exams_data.py` — `EXAMS`, a hardcoded dict that is the only source of exam content (questions, options, correct answers, points). There is no admin UI or DB table for authoring exams; adding a module means editing this dict directly.
- `app/scoring.py` — `calculate_score(exam_id, answers)` walks `EXAMS` to grade a submission; pure function, no I/O.
- `app/routers/exams.py` — public exam endpoints. `GET /exams/{id}` must return a **deep copy** of the exam with `answer` keys stripped — mutating the shared `EXAMS` dict in place (e.g. via `dict.pop`) silently breaks grading for every submission made afterward, since `calculate_score` reads `answer` off the same in-memory objects.
- `app/routers/admin.py` — read-only endpoints over persisted `ExamResult` rows, used by the frontend's admin panel.

### Frontend
- `src/api.js` — the only module that talks to the backend; base URL comes from `VITE_API_URL`.
- `src/App.jsx` — owns all top-level state: which page is active (`exam`/`admin`) and the exam flow's step machine (`name` -> `exam` -> `result`), plus the shared toast.
- `src/components/` — mostly presentational, driven by props from `App.jsx`. The exception is `AdminPage.jsx`, which manages its own results-list fetch and detail-modal state independently of the exam flow.
- `src/index.css` — one global stylesheet (no CSS modules, no Tailwind); it's a near-verbatim port of the original vanilla-JS prototype's styles, so class names are plain (e.g. `.question-card`, `.score-ring`) rather than component-scoped.
