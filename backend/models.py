from __future__ import annotations
from database import Base

from sqlalchemy import JSON, ForeignKey, String, Text, Integer, Float,DateTime, func
from sqlalchemy.orm import Mapped, mapped_column, relationship


class User(Base):
    __tablename__ = "users"

    id: Mapped[int] = mapped_column(Integer, primary_key=True, index=True)
    username: Mapped[str] = mapped_column(String(25), unique=True, nullable=False)
    email: Mapped[str] = mapped_column(Text, unique=True, nullable=False)
    hashed_password: Mapped[str] = mapped_column(String, nullable=False)
    full_name: Mapped[str | None] = mapped_column(String(50))
    height: Mapped[float | None] = mapped_column(Float)
    weight: Mapped[float | None] = mapped_column(Float)
    profile_pic: Mapped[str | None] = mapped_column(Text)
    

    workouts: Mapped[list[Workout]] = relationship("Workout", back_populates="user", cascade="all, delete")

    @property
    def profile_pic_path(self) -> str:
        if self.profile_pic:
            return f"/home/yassine/Projects/GymTracker/backend/media/profiles/{self.profile_pic}"
        return f"/home/yassine/Projects/GymTracker/backend/media/profiles/default.jpg"
    


class Workout(Base):
    __tablename__ = "workouts"

    id: Mapped[int] = mapped_column(Integer, primary_key=True, index=True)
    user_id: Mapped[int] = mapped_column(Integer, ForeignKey("users.id"), nullable=False, index=True)
    exercice: Mapped[str] = mapped_column(Text)
    sets: Mapped[dict] = mapped_column(JSON)
    week: Mapped[int] = mapped_column(Integer)

    user: Mapped[User] = relationship("User", back_populates="workouts")