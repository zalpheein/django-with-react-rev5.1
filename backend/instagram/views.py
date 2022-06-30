from django.shortcuts import render
from rest_framework.viewsets import ModelViewSet
from rest_framework.permissions import AllowAny
from .models import Post
from .serializers import PostSerializer

# ViewSet 은 CRUD 기능을 갖는 API를 자동으로 제작해 줌
class PostViewSet(ModelViewSet):
    queryset = Post.objects.all()
    serializer_class = PostSerializer

    # FIXME: 임시적으로 AllowAny 로 지정 한 것임
    permission_classes = [AllowAny]







