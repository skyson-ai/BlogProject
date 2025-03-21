from pydantic import BaseModel
from datetime import datetime

class UserBase(BaseModel):
    username: str

class UserCreate(UserBase):
    password: str

class User(UserBase):
    id: int

    class Config:
        orm_mode = True

class ArticleBase(BaseModel):
    title: str
    content: str
    category: str

class ArticleCreate(ArticleBase):
    pass

class Article(ArticleBase):
    id: int
    image_url: str | None
    created_at: datetime
    author_id: int

    class Config:
        from_attributes = True