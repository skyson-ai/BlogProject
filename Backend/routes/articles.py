from fastapi import APIRouter, Depends, HTTPException, UploadFile, File
from sqlalchemy.orm import Session
import os
from datetime import datetime
from database import get_db
from auth import get_current_user
from models.article import Article
from models.user import User

router = APIRouter()

@router.get("/articles/")
def get_articles(db: Session = Depends(get_db)):
    articles = db.query(Article).all()
    return articles

@router.post("/articles/")
def create_article(
    title: str,
    content: str,
    category: str,
    image: UploadFile = File(...),
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    # Sauvegarder l'image
    image_filename = f"{datetime.now().strftime('%Y%m%d%H%M%S')}_{image.filename}"
    image_path = os.path.join("uploads", image_filename)
    with open(image_path, "wb") as f:
        f.write(image.file.read())

    # Créer l'article
    article = Article(
        title=title,
        content=content,
        category=category,
        image_url=f"/uploads/{image_filename}",
        created_at=datetime.utcnow(),
        author_id=current_user.id
    )
    db.add(article)
    db.commit()
    db.refresh(article)
    return {"message": "Article créé", "article": article}

@router.put("/articles/{id}")
def update_article(
    id: int,
    title: str,
    content: str,
    category: str,
    image: UploadFile = File(None),
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    article = db.query(Article).filter(Article.id == id).first()
    if not article:
        raise HTTPException(status_code=404, detail="Article non trouvé")
    if article.author_id != current_user.id:
        raise HTTPException(status_code=403, detail="Non autorisé")

    article.title = title
    article.content = content
    article.category = category

    if image:
        # Supprimer l'ancienne image
        if article.image_url:
            old_image_path = article.image_url.replace("/uploads/", "uploads/")
            if os.path.exists(old_image_path):
                os.remove(old_image_path)
        # Sauvegarder la nouvelle image
        image_filename = f"{datetime.now().strftime('%Y%m%d%H%M%S')}_{image.filename}"
        image_path = os.path.join("uploads", image_filename)
        with open(image_path, "wb") as f:
            f.write(image.file.read())
        article.image_url = f"/uploads/{image_filename}"

    db.commit()
    db.refresh(article)
    return {"message": "Article mis à jour", "article": article}

@router.delete("/articles/{id}")
def delete_article(
    id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    article = db.query(Article).filter(Article.id == id).first()
    if not article:
        raise HTTPException(status_code=404, detail="Article non trouvé")
    if article.author_id != current_user.id:
        raise HTTPException(status_code=403, detail="Non autorisé")

    # Supprimer l'image associée
    if article.image_url:
        image_path = article.image_url.replace("/uploads/", "uploads/")
        if os.path.exists(image_path):
            os.remove(image_path)

    db.delete(article)
    db.commit()
    return {"message": "Article supprimé", "id": id}