from __future__ import annotations
from typing import Annotated

from fastapi import APIRouter, HTTPException, status
from fastapi.params import Depends

from sqlalchemy.orm import Session

from ..database import get_db
from ..models import Workout
from ..schemas import WorkoutCreate

from .auth import get_current_user

router = APIRouter()


@router.get("/workouts")
async def get_workouts(
    user: Annotated[dict, Depends(get_current_user)],
    db: Annotated[Session, Depends(get_db)]
    ):

    workouts = db.query(Workout).filter(Workout.user_id == user["id"]).all()

    return workouts



@router.post("/workouts")
def save_workout(user: Annotated[dict, Depends(get_current_user)], db: Annotated[Session, Depends(get_db)], workout: WorkoutCreate):
    new_workout = Workout (
        user_id=user["id"],
        exercice=workout.exercice,
        sets=[s.model_dump() for s in workout.sets],
        week=workout.week
    )

    db.add(new_workout)
    db.commit()
    db.refresh(new_workout)



@router.delete("/workouts/{id}")
def delete_workout(user: Annotated[dict, Depends(get_current_user)], db: Annotated[Session, Depends(get_db)], id: int):
    workout = db.query(Workout).filter(Workout.id == id).first()

    if workout is None:
        raise HTTPException(status_code=404, detail="Workout not found")
    
    db.delete(workout)
    db.commit()



@router.get("/workouts/{name}")
def get_exercice(user: Annotated[dict, Depends(get_current_user)], db: Annotated[Session, Depends(get_db)], name: str):
    exercice = db.query(Workout).filter(Workout.exercice == name).all()

    if not exercice:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail='Exercice not Found!'
        )

    return exercice