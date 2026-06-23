from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.database import Base, engine
from app.routers import admin, exams

Base.metadata.create_all(bind=engine)

app = FastAPI(title="QA Academy API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(exams.router)
app.include_router(admin.router)


@app.get("/")
def root():
    return {"message": "QA Academy API running 🚀"}
