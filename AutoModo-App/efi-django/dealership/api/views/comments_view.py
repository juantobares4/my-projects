from rest_framework.viewsets import ModelViewSet
from api.serializers.comments_serializer import CommentSerializer
from comments.models import Comment

class CommmentViewSet(ModelViewSet):
    queryset = Comment.objects.all()
    serializer_class = CommentSerializer

