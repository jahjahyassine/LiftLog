from fastapi import FastAPI
from fastapi.staticfiles import StaticFiles
from fastapi.middleware.cors import CORSMiddleware
import uvicorn

from .database import engine
from .models import Base

from .routes import auth, workouts

app = FastAPI()

Base.metadata.create_all(bind = engine)

app.include_router(auth.router)
app.include_router(workouts.router)


origin=["http://localhost:5173"]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origin,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

if __name__ == "__main__":
    uvicorn.run("backend.main:app", host="127.0.0.1", port=8000, reload=True)