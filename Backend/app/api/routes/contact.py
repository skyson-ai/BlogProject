from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.db.database import get_db
from app.db.models import ContactMessage, User
from app.api.dependencies import get_current_user
from pydantic import BaseModel
from typing import List

router = APIRouter()

# Schéma pour la création d'un message
class ContactMessageCreate(BaseModel):
    name: str
    email: str
    message: str

# Schéma pour la réponse
class ContactMessageResponse(BaseModel):
    id: int
    name: str
    email: str
    message: str
    created_at: str

    class Config:
        from_attributes = True

# Route pour enregistrer un message
@router.post("/contact")
def create_contact_message(message: ContactMessageCreate, db: Session = Depends(get_db)):
    db_message = ContactMessage(name=message.name, email=message.email, message=message.message)
    db.add(db_message)
    db.commit()
    db.refresh(db_message)
    return {"message": "Message envoyé avec succès"}

# Route pour récupérer tous les messages
@router.get("/contact", response_model=List[ContactMessageResponse])
def get_contact_messages(db: Session = Depends(get_db), current_user: User = Depends(get_current_user)):
    if current_user.role != "admin":
        raise HTTPException(status_code=403, detail="Non autorisé")
    messages = db.query(ContactMessage).all()
    
    # Convertir created_at en chaîne pour chaque message
    return [
        {
            "id": message.id,
            "name": message.name,
            "email": message.email,
            "message": message.message,
            "created_at": message.created_at.isoformat()
        }
        for message in messages
    ]
    
  # Route pour supprimer un message
@router.delete("/contact/{id}")
def delete_contact_message(id: int, db: Session = Depends(get_db), current_user: User = Depends(get_current_user)):
    if current_user.role != "admin":
        raise HTTPException(status_code=403, detail="Non autorisé")
    message = db.query(ContactMessage).filter(ContactMessage.id == id).first()
    if not message:
        raise HTTPException(status_code=404, detail="Message non trouvé")
    db.delete(message)
    db.commit()
    return {"message": "Message supprimé avec succès"}