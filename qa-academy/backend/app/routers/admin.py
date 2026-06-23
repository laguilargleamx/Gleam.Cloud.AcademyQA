from typing import List

from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.auth import require_admin
from app.database import get_db
from app.models import ExamResult
from app.schemas import ExamResultOut

router = APIRouter(prefix="/admin", tags=["admin"], dependencies=[Depends(require_admin)])


@router.get("/results", response_model=List[ExamResultOut])
def get_all_results(db: Session = Depends(get_db)):
    return db.query(ExamResult).order_by(ExamResult.submitted_at.desc()).all()


@router.get("/results/{result_id}")
def get_result_detail(result_id: int, db: Session = Depends(get_db)):
    result = db.query(ExamResult).filter(ExamResult.id == result_id).first()
    if not result:
        raise HTTPException(status_code=404, detail="Resultado no encontrado")
    return result
