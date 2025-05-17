# app/db/database.py
from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
from app.core.config import settings
import logging

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

logger.info("DATABASE_URL : %s", settings.DATABASE_URL)
DATABASE_URL = str(settings.DATABASE_URL).replace("postgres://", "postgresql+psycopg://")
logger.info("DATABASE_URL après remplacement : %s", DATABASE_URL)

try:
    engine = create_engine(
        DATABASE_URL,
        connect_args={
            "connect_timeout": 10,
            "sslmode": "require",
            "keepalives": 1,
            "keepalives_idle": 30,
            "keepalives_interval": 10,
            "keepalives_count": 5,
        },
        pool_pre_ping=True,  # Vérifie la connexion avant utilisation
        pool_size=5,
        max_overflow=10,
    )
    logger.info("Connexion à la base de données établie")
except Exception as e:
    logger.error(f"Erreur lors de la connexion à la base de données: {str(e)}")
    raise

SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
Base = declarative_base()

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()