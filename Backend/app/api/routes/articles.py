from fastapi import APIRouter, Depends, HTTPException, UploadFile, File, Form
from sqlalchemy.orm import Session
import os
from datetime import datetime
from app.db.database import get_db
from app.api.dependencies import get_current_user
from app.db.models import Article, Section, User
from app.db.schemas import Article as ArticleSchema, ArticleCreate, SectionCreate
from typing import List

router = APIRouter()

# Route pour récupérer tous les articles
@router.get("/", response_model=List[ArticleSchema])
def get_articles(db: Session = Depends(get_db)):
    return db.query(Article).all()

# Route pour récupérer un article spécifique par son ID
@router.get("/{id}", response_model=ArticleSchema)
def get_article(id: int, db: Session = Depends(get_db)):
    article = db.query(Article).filter(Article.id == id).first()
    if not article:
        raise HTTPException(status_code=404, detail="Article non trouvé")
    return article

# Route pour créer un article avec sections
@router.post("/", response_model=ArticleSchema)
async def create_article(
    title: str = Form(...),
    category: str = Form(...),
    sections_content: List[str] = Form(...),  # Contenu texte des sections
    files: List[UploadFile] = File(...),      # Liste des fichiers uploadés
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    if current_user.role != "admin":
        raise HTTPException(status_code=403, detail="Non autorisé")

    # Validation : au moins une section et correspondance fichiers/contenu
    if not sections_content or len(files) < len(sections_content) or len(files) > 2 * len(sections_content):
        raise HTTPException(status_code=400, detail="Nombre de fichiers ou de contenus invalide")

    # Création de l'article
    article = Article(
        title=title,
        category=category,
        author_id=current_user.id
    )
    db.add(article)
    db.commit()
    db.refresh(article)

    # Gestion des sections et uploads
    file_index = 0
    for content in sections_content:
        photo1_filename = f"{datetime.now().strftime('%Y%m%d%H%M%S')}_{files[file_index].filename}"
        photo1_path = os.path.join("uploads", photo1_filename)
        with open(photo1_path, "wb") as f:
            image_data = await files[file_index].read()
            f.write(image_data)
        file_index += 1

        # Deuxième photo (optionnelle)
        photo2_path = None
        if file_index < len(files) and file_index <= 2 * len(sections_content):
            photo2_filename = f"{datetime.now().strftime('%Y%m%d%H%M%S')}_{files[file_index].filename}"
            photo2_path = os.path.join("uploads", photo2_filename)
            with open(photo2_path, "wb") as f:
                image_data = await files[file_index].read()
                f.write(image_data)
            file_index += 1

        # Création de la section
        section = Section(
            article_id=article.id,
            photo1_url=f"/uploads/{photo1_filename}",
            photo2_url=f"/uploads/{photo2_filename}" if photo2_path else None,
            content=content
        )
        db.add(section)

    db.commit()
    db.refresh(article)
    return article

# Route pour mettre à jour un article
@router.put("/{id}", response_model=ArticleSchema)
async def update_article(
    id: int,
    title: str = Form(...),
    category: str = Form(...),
    sections_content: List[str] = Form(...),
    files: List[UploadFile] = File(...),
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    if current_user.role != "admin":
        raise HTTPException(status_code=403, detail="Non autorisé")

    article = db.query(Article).filter(Article.id == id).first()
    if not article:
        raise HTTPException(status_code=404, detail="Article non trouvé")

    # Validation des fichiers et contenu
    if not sections_content or len(files) < len(sections_content) or len(files) > 2 * len(sections_content):
        raise HTTPException(status_code=400, detail="Nombre de fichiers ou de contenus invalide")

    # Mise à jour des champs de l'article
    article.title = title
    article.category = category

    # Suppression des anciennes sections et photos
    old_sections = db.query(Section).filter(Section.article_id == article.id).all()
    for section in old_sections:
        if section.photo1_url and os.path.exists(section.photo1_url.replace("/uploads/", "uploads/")):
            os.remove(section.photo1_url.replace("/uploads/", "uploads/"))
        if section.photo2_url and os.path.exists(section.photo2_url.replace("/uploads/", "uploads/")):
            os.remove(section.photo2_url.replace("/uploads/", "uploads/"))
        db.delete(section)

    # Ajout des nouvelles sections
    file_index = 0
    for content in sections_content:
        photo1_filename = f"{datetime.now().strftime('%Y%m%d%H%M%S')}_{files[file_index].filename}"
        photo1_path = os.path.join("uploads", photo1_filename)
        with open(photo1_path, "wb") as f:
            image_data = await files[file_index].read()
            f.write(image_data)
        file_index += 1

        photo2_path = None
        if file_index < len(files) and file_index <= 2 * len(sections_content):
            photo2_filename = f"{datetime.now().strftime('%Y%m%d%H%M%S')}_{files[file_index].filename}"
            photo2_path = os.path.join("uploads", photo2_filename)
            with open(photo2_path, "wb") as f:
                image_data = await files[file_index].read()
                f.write(image_data)
            file_index += 1

        section = Section(
            article_id=article.id,
            photo1_url=f"/uploads/{photo1_filename}",
            photo2_url=f"/uploads/{photo2_filename}" if photo2_path else None,
            content=content
        )
        db.add(section)

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
    if current_user.role != "admin":
        raise HTTPException(status_code=403, detail="Non autorisé")

    article = db.query(Article).filter(Article.id == id).first()
    if not article:
        raise HTTPException(status_code=404, detail="Article non trouvé")

    # Suppression des fichiers associés aux sections
    for section in article.sections:
        if section.photo1_url and os.path.exists(section.photo1_url.replace("/uploads/", "uploads/")):
            os.remove(section.photo1_url.replace("/uploads/", "uploads/"))
        if section.photo2_url and os.path.exists(section.photo2_url.replace("/uploads/", "uploads/")):
            os.remove(section.photo2_url.replace("/uploads/", "uploads/"))

    db.delete(article)
    db.commit()
    return {"message": "Article supprimé", "id": id}