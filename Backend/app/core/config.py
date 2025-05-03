from pydantic import BaseSettings, PostgresDsn, validator

class Settings(BaseSettings):
    DATABASE_URL: PostgresDsn  # Utiliser PostgresDsn pour valider l'URL
    SECRET_KEY: str
    FRONTEND_URL: str

    @validator("DATABASE_URL", pre=True)
    def clean_database_url(cls, v):
        if isinstance(v, str) and v.startswith("DATABASE_URL="):
            return v[len("DATABASE_URL="):]  # Supprimer le préfixe
        return v

    class Config:
        env_file = ".env"
        env_file_encoding = "utf-8"

settings = Settings()