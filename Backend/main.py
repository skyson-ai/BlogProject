import os
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
import uvicorn
from app.api.routes import auth, users, articles
from app.db.database import engine, Base
from app.core.config import settings
from app.api.routes import contact

app = FastAPI(title="Blog Backend")

# Créer le dossier uploads s'il n'existe pas
os.makedirs("uploads", exist_ok=True)

app.add_middleware(
    CORSMiddleware,
    allow_origins=[settings.FRONTEND_URL],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.mount("/uploads", StaticFiles(directory="uploads"), name="uploads")

Base.metadata.create_all(bind=engine)

app.include_router(auth.router, prefix="/auth", tags=["auth"])
app.include_router(users.router, prefix="/users", tags=["users"])
app.include_router(articles.router, prefix="/articles", tags=["articles"])
app.include_router(contact.router, prefix="/api", tags=["contact"])

@app.get("/")
def read_root():
    return {"message": "Welcome to Voix Indélébiles API"}

if __name__ == "__main__":
    port = int(os.getenv("PORT", 8001))  
    uvicorn.run(app, host="0.0.0.0", port=port)