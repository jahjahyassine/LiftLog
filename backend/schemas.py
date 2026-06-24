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


class UserResponse(UserBase):
    id: int
    email: str