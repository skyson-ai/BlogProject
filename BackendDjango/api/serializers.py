from rest_framework import serializers
from .models import User, Article

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ["id", "username", "email", "created_at"]

class ArticleSerializer(serializers.ModelSerializer):
    author = UserSerializer(read_only=True)
    author_id = serializers.PrimaryKeyRelatedField(
        queryset=User.objects.all(), source="author", write_only=True
    )

    class Meta:
        model = Article
        fields = ["id", "title", "content", "category", "image_url", "created_at", "author", "author_id"]