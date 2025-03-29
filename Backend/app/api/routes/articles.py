from fastapi import APIRouter, Depends, HTTPException, UploadFile, File, Form
from sqlalchemy.orm import Session
import os
from datetime import datetime
from app.db.database import get_db
from app.api.dependencies import get_current_user
from app.db.models import Article, User
from app.db.schemas import Article as ArticleSchema
from typing import List

router = APIRouter()

# Route pour récupérer tous les articles
@router.get("/", response_model=list[ArticleSchema])
def get_articles(db: Session = Depends(get_db)):
    return db.query(Article).all()

# Route pour récupérer un article spécifique par son ID
@router.get("/{id}", response_model=ArticleSchema)
def get_article(id: int, db: Session = Depends(get_db)):
    article = db.query(Article).filter(Article.id == id).first()
    if not article:
        raise HTTPException(status_code=404, detail="Article non trouvé")
    return article

# Route pour créer un article avec plusieurs images
@router.post("/", response_model=ArticleSchema)
async def create_article(
    title: str = Form(...),
    content: str = Form(...),
    category: str = Form(...),
    images: List[UploadFile] = File([]),  # Accepte plusieurs fichiers
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    if current_user.role != "admin":
        raise HTTPException(status_code=403, detail="Non autorisé")

    # Sauvegarder les images uploadées
    image_urls = []
    for image in images:
        image_filename = f"{datetime.now().strftime('%Y%m%d%H%M%S')}_{image.filename}"
        image_path = os.path.join("uploads", image_filename)
        os.makedirs("uploads", exist_ok=True)
        with open(image_path, "wb") as f:
            image_data = await image.read()
            f.write(image_data)
        image_urls.append(f"/uploads/{image_filename}")

    # Intégrer les URLs des images dans le contenu
    updated_content = content
    for i, url in enumerate(image_urls, 1):
        placeholder = f"[image{i}]"  # Placeholder dans le contenu, par ex. "[image1]"
        updated_content = updated_content.replace(placeholder, f"![Image]({url})")  # Format Markdown

    # Si aucune image n’est uploadée, la première sera dans image_url
    primary_image_url = image_urls[0] if image_urls else None

    article = Article(
        title=title,
        content=updated_content,  
        category=category,
        image_url=primary_image_url,  # Garde la première image comme image principale
        author_id=current_user.id
    )
    db.add(article)
    db.commit()
    db.refresh(article)
    return article

# Route pour mettre à jour un article
@router.put("/{id}", response_model=ArticleSchema)
async def update_article(
    id: int,
    title: str = Form(...),
    content: str = Form(...),
    category: str = Form(...),
    images: List[UploadFile] = File([]),  # Accepte plusieurs fichiers
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    article = db.query(Article).filter(Article.id == id).first()
    if not article:
        raise HTTPException(status_code=404, detail="Article non trouvé")
    if current_user.role != "admin":
        raise HTTPException(status_code=403, detail="Non autorisé")

    # Supprimer l’ancienne image principale si elle existe et n’est pas réutilisée
    old_image_urls = [article.image_url] if article.image_url else []
    new_image_urls = []

    # Sauvegarder les nouvelles images uploadées
    for image in images:
        image_filename = f"{datetime.now().strftime('%Y%m%d%H%M%S')}_{image.filename}"
        image_path = os.path.join("uploads", image_filename)
        with open(image_path, "wb") as f:
            image_data = await image.read()
            f.write(image_data)
        new_image_urls.append(f"/uploads/{image_filename}")

    # Intégrer les URLs des images dans le contenu
    updated_content = content
    for i, url in enumerate(new_image_urls, 1):
        placeholder = f"[image{i}]"
        updated_content = updated_content.replace(placeholder, f"![Image]({url})")

    # Mettre à jour les champs
    article.title = title
    article.content = updated_content
    article.category = category
    article.image_url = new_image_urls[0] if new_image_urls else article.image_url

    # Supprimer les anciennes images qui ne sont plus utilisées
    for old_url in old_image_urls:
        if old_url and old_url not in updated_content and old_url != article.image_url:
            old_image_path = old_url.replace("/uploads/", "uploads/")
            if os.path.exists(old_image_path):
                os.remove(old_image_path)

    db.commit()
    db.refresh(article)
    return article

# Route pour supprimer un article
@router.delete("/{id}")
def delete_article(
    id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    article = db.query(Article).filter(Article.id == id).first()
    if not article:
        raise HTTPException(status_code=404, detail="Article non trouvé")
    if current_user.role != "admin":
        raise HTTPException(status_code=403, detail="Non autorisé")

    # Supprimer les images associées dans content et image_url
    if article.image_url:
        image_path = article.image_url.replace("/uploads/", "uploads/")
        if os.path.exists(image_path):
            os.remove(image_path)
    # Recherche des URLs d’images dans le contenu (simplifié ici)
    import re
    image_urls = re.findall(r"!\[Image\]\((/uploads/[^)]+)\)", article.content)
    for url in image_urls:
        image_path = url.replace("/uploads/", "uploads/")
        if os.path.exists(image_path):
            os.remove(image_path)

    db.delete(article)
    db.commit()
    return {"message": "Article supprimé", "id": id}