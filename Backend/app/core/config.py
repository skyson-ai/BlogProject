from pydantic_settings import BaseSettings

class Settings(BaseSettings):
    DATABASE_URL: str = "postgresql://blog_user:L270127N@localhost:5432/blog_db?client_encoding=utf8"
    SECRET_KEY: str = "huhfhufh66537687dhfjbchvkfogugkfhbh"  # À mettre dans un .env en production
    ALGORITHM: str = "HS256"
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 30
    FRONTEND_URL: str = "http://localhost:3000"

    class Config:
        env_file = ".env"
        env_file_encoding = "utf-8"

settings = Settings()