from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
from app.core.config import settings

# Débogage
print("DATABASE_URL brute :", settings.DATABASE_URL)

# Remplacer 'postgres://' par 'postgresql+psycopg://'
DATABASE_URL = settings.DATABASE_URL.replace("postgres://", "postgresql+psycopg://")
print("DATABASE_URL après remplacement :", DATABASE_URL)

try:
    engine = create_engine(DATABASE_URL)
    print("Connexion à la base de données réussie")
except Exception as e:
    print(f"Erreur lors de la création du moteur SQLAlchemy : {e}")
    raise

SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
Base = declarative_base()

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()