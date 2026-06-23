import os
from datetime import datetime, timedelta, timezone

import jwt
from fastapi import Depends, HTTPException, status
from fastapi.security import HTTPAuthorizationCredentials, HTTPBearer
from pydantic import BaseModel

SECRET_KEY = os.environ["AUTH_SECRET_KEY"]
ALGORITHM = "HS256"
TOKEN_TTL = timedelta(hours=12)

USERS = {
    os.environ["STUDENT_USERNAME"]: {"password": os.environ["STUDENT_PASSWORD"], "role": "student", "display_name": "Diana"},
    os.environ["ADMIN_USERNAME"]: {"password": os.environ["ADMIN_PASSWORD"], "role": "admin", "display_name": "Luis"},
}

bearer_scheme = HTTPBearer()


class LoginRequest(BaseModel):
    username: str
    password: str


class LoginResponse(BaseModel):
    token: str
    role: str
    username: str
    display_name: str


def authenticate(username: str, password: str) -> LoginResponse:
    user = USERS.get(username)
    if not user or user["password"] != password:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Usuario o contraseña incorrectos")

    payload = {
        "sub": username,
        "role": user["role"],
        "exp": datetime.now(timezone.utc) + TOKEN_TTL,
    }
    token = jwt.encode(payload, SECRET_KEY, algorithm=ALGORITHM)
    return LoginResponse(token=token, role=user["role"], username=username, display_name=user["display_name"])


def get_current_user(credentials: HTTPAuthorizationCredentials = Depends(bearer_scheme)) -> dict:
    try:
        payload = jwt.decode(credentials.credentials, SECRET_KEY, algorithms=[ALGORITHM])
    except jwt.PyJWTError:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Token inválido o expirado")
    return {"username": payload["sub"], "role": payload["role"]}


def require_admin(user: dict = Depends(get_current_user)) -> dict:
    if user["role"] != "admin":
        raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail="Solo el administrador puede ver esto")
    return user
