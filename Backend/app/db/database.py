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
    engine = create_engine(DATABASE_URL, pool_size=5, max_overflow=10)
    logger.info("Connexion à la base de données réussie")
except Exception as e:
    logger.error("Erreur lors de la création du moteur SQLAlchemy : %s", e)
    raise

SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
Base = declarative_base()

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()