from pydantic import BaseModel
from datetime import datetime
from typing import List, Optional

class UserBase(BaseModel):
    username: str

class UserCreate(UserBase):
    password: str

class User(UserBase):
    id: int
    role: str
    class Config:
        from_attributes = True

class SectionBase(BaseModel):
    content: str
    photo1_url: str
    photo2_url: Optional[str] = None

class SectionCreate(BaseModel):
    content: str

class Section(SectionBase):
    id: int
    article_id: int
    class Config:
        from_attributes = True

class ArticleBase(BaseModel):
    title: str
    category: str

class ArticleCreate(ArticleBase):
    sections: List[SectionCreate] 

class Article(ArticleBase):
    id: int
    created_at: datetime
    author_id: int
    sections: List[Section] 
    class Config:
        from_attributes = True