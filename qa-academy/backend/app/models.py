from datetime import datetime

from sqlalchemy import Column, DateTime, Float, Integer, JSON, String

from app.database import Base


class ExamResult(Base):
    __tablename__ = "exam_results"
    id = Column(Integer, primary_key=True, index=True)
    student_name = Column(String, nullable=False)
    exam_id = Column(String, nullable=False)
    exam_title = Column(String, nullable=False)
    score = Column(Float, nullable=False)
    total_points = Column(Integer, nullable=False)
    answers = Column(JSON, nullable=False)
    submitted_at = Column(DateTime, default=datetime.utcnow)
