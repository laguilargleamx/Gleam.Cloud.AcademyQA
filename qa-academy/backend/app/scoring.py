from typing import List

from fastapi import HTTPException

from app.exams_data import EXAMS
from app.schemas import AnswerIn


def calculate_score(exam_id: str, answers: List[AnswerIn]):
    exam = EXAMS.get(exam_id)
    if not exam:
        raise HTTPException(status_code=404, detail="Examen no encontrado")

    question_map = {}
    for section in exam["sections"]:
        for q in section["questions"]:
            question_map[q["id"]] = q

    score = 0
    detail = []
    for ans in answers:
        q = question_map.get(ans.question_id)
        if q:
            correct = ans.selected == q["answer"]
            if correct:
                score += q["points"]
            detail.append({
                "question_id": ans.question_id,
                "selected": ans.selected,
                "correct_answer": q["answer"],
                "is_correct": correct,
                "points_earned": q["points"] if correct else 0,
            })

    return score, detail
