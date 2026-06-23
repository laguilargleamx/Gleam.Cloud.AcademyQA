from datetime import datetime
from typing import List

from pydantic import BaseModel


class AnswerIn(BaseModel):
    question_id: int
    selected: str


class ExamSubmission(BaseModel):
    student_name: str
    exam_id: str
    answers: List[AnswerIn]


class ExamResultOut(BaseModel):
    id: int
    student_name: str
    exam_id: str
    exam_title: str
    score: float
    total_points: int
    submitted_at: datetime

    class Config:
        from_attributes = True
