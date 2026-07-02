from pydantic import BaseModel


class UserBase(BaseModel):
    username: str
    full_name: str
    height: float | None = None
    weight: float | None = None
    profile_pic: str | None = None


class UserCreate(BaseModel):
    username: str
    full_name: str
    email: str
    password: str

class UserLogin(BaseModel):
    email: str
    password: str
    remember: bool = False

class UserResponse(UserBase):
    id: int
    email: str


class WorkoutSet(BaseModel):
    weight: float
    reps: int

class WorkoutCreate(BaseModel):
    exercice: str
    sets: list[WorkoutSet]
    week: int