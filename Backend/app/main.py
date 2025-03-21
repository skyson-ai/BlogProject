from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from app.api.routes import auth, users, articles  # comments à ajouter plus tard
from app.db.database import engine, Base
from app.core.config import settings

app = FastAPI(title="Blog Backend")

# CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=[settings.FRONTEND_URL],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Servir les fichiers statiques (images uploadées)
app.mount("/uploads", StaticFiles(directory="uploads"), name="uploads")

# Créer les tables dans la base de données
Base.metadata.create_all(bind=engine)

# Inclure les routes
app.include_router(auth.router, prefix="/auth", tags=["auth"])
app.include_router(users.router, prefix="/users", tags=["users"])
app.include_router(articles.router, prefix="/articles", tags=["articles"])

@app.get("/")
def read_root():
    return {"message": "Welcome to Voix Indélébiles API"}