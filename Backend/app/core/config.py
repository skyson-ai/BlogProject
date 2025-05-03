from pydantic import BaseSettings
from pydantic import PostgresDsn, validator

class Settings(BaseSettings):
    DATABASE_URL: PostgresDsn  
    SECRET_KEY: str
    FRONTEND_URL: str

    @validator("DATABASE_URL", pre=True)
    def clean_database_url(cls, v):
        if isinstance(v, str) and v.startswith("DATABASE_URL="):
            return v[len("DATABASE_URL="):]  
        return v

    class Config:
        env_file = ".env"
        env_file_encoding = "utf-8"

settings = Settings()