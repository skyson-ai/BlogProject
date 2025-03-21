from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.db.database import get_db
from app.db.models import User
from app.api.dependencies import get_current_user
from app.db.schemas import User as UserSchema

router = APIRouter()

@router.get("/me", response_model=UserSchema)
def read_current_user(current_user: User = Depends(get_current_user)):
    return current_user