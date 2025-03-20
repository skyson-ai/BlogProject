from fastapi import FastAPI, Depends, HTTPException, status
from fastapi.security import OAuth2PasswordRequestForm
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from sqlalchemy.orm import Session
from datetime import timedelta
from database import Base, engine, get_db
from routes import articles
from models.user import User
from pydantic import BaseModel
from auth import get_password_hash, create_access_token, verify_password, ACCESS_TOKEN_EXPIRE_MINUTES

app = FastAPI(title="Blog Backend")

# CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Servir les fichiers statiques (images uploadées)
app.mount("/uploads", StaticFiles(directory="uploads"), name="uploads")

# Modèles Pydantic
class UserCreate(BaseModel):
    username: str
    password: str

@app.post("/admin/register")
def register(user: UserCreate, db: Session = Depends(get_db)):
    if db.query(User).filter(User.username == user.username).first():
        raise HTTPException(status_code=400, detail="Utilisateur existe déjà")
    hashed_password = get_password_hash(user.password)
    db_user = User(username=user.username, hashed_password=hashed_password)
    db.add(db_user)
    db.commit()
    return {"message": "Utilisateur créé", "username": user.username}

@app.post("/token")
def login(form_data: OAuth2PasswordRequestForm = Depends(), db: Session = Depends(get_db)):
    user = db.query(User).filter(User.username == form_data.username).first()
    if not user or not verify_password(form_data.password, user.hashed_password):
        raise HTTPException(status_code=400, detail="Identifiants invalides")
    access_token_expires = timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    access_token = create_access_token(
        data={"sub": user.username}, expires_delta=access_token_expires
    )
    return {"access_token": access_token, "token_type": "bearer"}

# Routes
Base.metadata.create_all(bind=engine)
app.include_router(articles.router)

@app.get("/")
def read_root():
    return {"message": "Welcome to Voix Indélébiles API"}