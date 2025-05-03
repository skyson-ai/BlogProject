import os
from dotenv import load_dotenv

load_dotenv()

class Settings:
    DATABASE_URL: str = os.getenv("DATABASE_URL")
    SECRET_KEY: str = os.getenv("SECRET_KEY", "huhfhufh66537687dhfjbchvkfogugkfhbh")
    ALGORITHM: str = "HS256"
    ACCESS_TOKEN_EXPIRE_MINUTES: int = int(os.getenv("ACCESS_TOKEN_EXPIRE_MINUTES", 30))
    FRONTEND_URL: str = os.getenv("FRONTEND_URL", "http://localhost:3000")

    def __init__(self):
        print("DATABASE_URL chargée dans Settings :", self.DATABASE_URL)
        if not self.DATABASE_URL:
            raise ValueError("DATABASE_URL n'est pas défini dans les variables d'environnement")

settings = Settings()