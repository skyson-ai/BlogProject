from fastapi import APIRouter, Depends, HTTPException, UploadFile, File, Form
from sqlalchemy.orm import Session
import os
from datetime import datetime
from app.db.database import get_db
from app.api.dependencies import get_current_user
from app.db.models import Article, User
from app.db.schemas import Article as ArticleSchema

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

# Route pour créer un article
@router.post("/", response_model=ArticleSchema)
async def create_article(
    title: str = Form(...),
    content: str = Form(...),
    category: str = Form(...),
    image: UploadFile = File(...),
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    if current_user.role != "admin":
        raise HTTPException(status_code=403, detail="Non autorisé")
    
    image_filename = f"{datetime.now().strftime('%Y%m%d%H%M%S')}_{image.filename}"
    image_path = os.path.join("uploads", image_filename)
    os.makedirs("uploads", exist_ok=True)
    with open(image_path, "wb") as f:
        image_data = await image.read()
        f.write(image_data)

    article = Article(
        title=title,
        content=content,  
        category=category,
        image_url=f"/uploads/{image_filename}",
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
    image: UploadFile = File(None),
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    article = db.query(Article).filter(Article.id == id).first()
    if not article:
        raise HTTPException(status_code=404, detail="Article non trouvé")
    if current_user.role != "admin":
        raise HTTPException(status_code=403, detail="Non autorisé")

    article.title = title
    article.content = content  
    article.category = category

    if image:
        if article.image_url:
            old_image_path = article.image_url.replace("/uploads/", "uploads/")
            if os.path.exists(old_image_path):
                os.remove(old_image_path)
        image_filename = f"{datetime.now().strftime('%Y%m%d%H%M%S')}_{image.filename}"
        image_path = os.path.join("uploads", image_filename)
        with open(image_path, "wb") as f:
            image_data = await image.read()  
            f.write(image_data)
        article.image_url = f"/uploads/{image_filename}"

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

    if article.image_url:
        image_path = article.image_url.replace("/uploads/", "uploads/")
        if os.path.exists(image_path):
            os.remove(image_path)

    db.delete(article)
    db.commit()
    return {"message": "Article supprimé", "id": id}