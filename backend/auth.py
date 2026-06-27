from __future__ import annotations
from typing import Annotated

from fastapi import APIRouter, HTTPException, status
from fastapi.params import Depends
from fastapi.security import OAuth2PasswordBearer

from sqlalchemy.orm import Session

from passlib.context import CryptContext

from jose import jwt, JWTError

from datetime import datetime, timedelta
from dotenv import load_dotenv
import os

from database import get_db
from models import User, Workout
from schemas import UserCreate, UserLogin, WorkoutCreate



router = APIRouter()

bcrypt_context = CryptContext(schemes=['bcrypt'], deprecated='auto')

load_dotenv()
JWT_SECRET_KEY = os.getenv("JWT_SECRET_KEY")
ALGORITHM = os.getenv("ALGORITHM")

oauth2_bearer = OAuth2PasswordBearer(tokenUrl='login')


@router.post("/register")
async def create_user(db: Annotated[Session, Depends(get_db)], user: UserCreate):

    existing_email = db.query(User).filter(User.email == user.email).first()
    if existing_email:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Email already registred") 

    existing_username = db.query(User).filter(User.username == user.username).first()
    if existing_username:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Username already registred")  

    new_user = User (
        username=user.username,
        full_name=user.full_name,
        email=user.email,
        hashed_password=bcrypt_context.hash(user.password)
    )

    db.add(new_user)
    db.commit()

    db.refresh(new_user)

    return new_user



@router.post("/login")
async def verify_credentials(db: Annotated[Session, Depends(get_db)], credentials: UserLogin):
    user = db.query(User).filter(User.email == credentials.email).first()

    if not user:
        raise HTTPException(
            status_code=404,
            detail="Email not Found!"
        )

    if not bcrypt_context.verify(credentials.password, user.hashed_password):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid Password"
        )

    token = create_token(user.username, user.id, timedelta(minutes=30))

    return {
        "access_token": token,
        "token_type": "bearer"
    }



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
        sets=[s.model_dump() for s in workout.sets]
    )

    db.add(new_workout)
    db.commit()
    db.refresh(new_workout)



@router.get("/me")
def get_me(user: Annotated[dict, Depends(get_current_user)]):
    return user

def create_token(username: str, id: int, expires_delta: timedelta):
    encode = {
        "sub": username,
        "id": id
    }
    expires = datetime.utcnow() + expires_delta
    encode.update({"exp": expires})

    return jwt.encode(encode, JWT_SECRET_KEY, algorithm=ALGORITHM)


def get_current_user(token: Annotated[str, Depends(oauth2_bearer)]):
    try:
        payload = jwt.decode(token, JWT_SECRET_KEY, algorithms=[ALGORITHM])
        username = payload.get('sub')
        user_id = payload.get('id')
        if username is None or user_id is None:
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="Could not validate user!"
            )
        return {
            'username': username,
            'id': user_id
        }
    except JWTError:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail='Could not validate user!'
        )