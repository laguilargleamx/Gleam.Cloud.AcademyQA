from fastapi import APIRouter

from app.auth import LoginRequest, LoginResponse, authenticate

router = APIRouter(prefix="/auth", tags=["auth"])


@router.post("/login", response_model=LoginResponse)
def login(body: LoginRequest):
    return authenticate(body.username, body.password)
