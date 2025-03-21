import os
from dotenv import load_dotenv

load_dotenv()  # Charge les variables d'environnement depuis .env

class Settings:
    DATABASE_URL: str = os.getenv("DATABASE_URL", "postgresql://blog_user:L270127N@localhost:5432/blog_db?client_encoding=utf8")
    SECRET_KEY: str = os.getenv("SECRET_KEY", "huhfhufh66537687dhfjbchvkfogugkfhbh")
    ALGORITHM: str = "HS256"
    ACCESS_TOKEN_EXPIRE_MINUTES: int = int(os.getenv("ACCESS_TOKEN_EXPIRE_MINUTES", 30))
    FRONTEND_URL: str = os.getenv("FRONTEND_URL", "http://localhost:3000")

settings = Settings()