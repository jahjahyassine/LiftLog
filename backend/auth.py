from typing import Annotated

from fastapi import APIRouter, HTTPException
from fastapi.params import Depends

from sqlalchemy.orm import Session

from passlib.context import CryptContext

from jose import jwt

from datetime import datetime, timedelta
from dotenv import load_dotenv
import os

from database import get_db
from models import User
from schemas import UserCreate, UserLogin



router = APIRouter()

bcrypt_context = CryptContext(schemes=['bcrypt'], deprecated='auto')

load_dotenv()
JWT_SECRET_KEY = os.getenv("JWT_SECRET_KEY")
ALGORITHM = os.getenv("ALGORITHM")



@router.post("/register")
async def create_user(db: Annotated[Session, Depends(get_db)], user: UserCreate):

    existing_email = db.query(User).filter(User.email == user.email).first()
    if existing_email:
        raise HTTPException(status_code=400, detail="Email already registred") 

    existing_username = db.query(User).filter(User.username == user.username).first()
    if existing_username:
        raise HTTPException(status_code=400, detail="Username already registred")  

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
            status_code=401,
            detail="Invalid Password"
        )

    token = create_token(user.username, user.id, timedelta(minutes=30))

    return {
        "access_token": token,
        "token_type": "bearer"
    }


def create_token(username: str, id: int, expires_delta: timedelta):
    encode = {
        "sub": username,
        "id": id
    }
    expires = datetime.utcnow() + expires_delta
    encode.update({"exp": expires})
    return jwt.encode(encode, JWT_SECRET_KEY, algorithm=ALGORITHM)