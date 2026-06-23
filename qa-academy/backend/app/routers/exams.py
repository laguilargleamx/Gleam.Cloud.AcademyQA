import copy
from datetime import datetime

from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.database import get_db
from app.exams_data import EXAMS
from app.models import ExamResult
from app.scoring import calculate_score
from app.schemas import ExamSubmission

router = APIRouter(tags=["exams"])


@router.get("/exams")
def list_exams():
    return [{"id": e["id"], "title": e["title"], "total_points": e["total_points"]} for e in EXAMS.values()]


@router.get("/exams/{exam_id}")
def get_exam(exam_id: str):
    exam = EXAMS.get(exam_id)
    if not exam:
        raise HTTPException(status_code=404, detail="Examen no encontrado")
    # Devuelve una copia profunda sin respuestas, sin mutar EXAMS
    clean = copy.deepcopy(exam)
    for section in clean["sections"]:
        for q in section["questions"]:
            q.pop("answer", None)
    return clean


@router.post("/exams/{exam_id}/submit")
def submit_exam(exam_id: str, submission: ExamSubmission, db: Session = Depends(get_db)):
    exam = EXAMS.get(exam_id)
    if not exam:
        raise HTTPException(status_code=404, detail="Examen no encontrado")

    score, detail = calculate_score(exam_id, submission.answers)

    result = ExamResult(
        student_name=submission.student_name,
        exam_id=exam_id,
        exam_title=exam["title"],
        score=score,
        total_points=exam["total_points"],
        answers=detail,
        submitted_at=datetime.utcnow(),
    )
    db.add(result)
    db.commit()
    db.refresh(result)

    return {
        "id": result.id,
        "student_name": result.student_name,
        "score": score,
        "total_points": exam["total_points"],
        "percentage": round((score / exam["total_points"]) * 100, 1),
        "detail": detail,
        "submitted_at": result.submitted_at,
    }
