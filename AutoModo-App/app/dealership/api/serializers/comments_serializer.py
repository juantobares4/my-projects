from rest_framework import serializers
from comments.models import Comment
from offer.models import Offer
from api.serializers.profile_serializer import UserRegisterSerializer

class CommentSerializer(serializers.ModelSerializer):
    username = serializers.CharField(source='profile.username', read_only=True)

    class Meta:
        model = Comment
        fields = ('comment','username',)

class OfferCommentsSerializer(serializers.ModelSerializer):
    comments = serializers.SerializerMethodField() 
    offer_id = serializers.IntegerField(source='id')

    class Meta:
        model = Offer
        fields = ('offer_id', 'comments',) 

    def get_comments(self, obj):
        return CommentSerializer(obj.comments.all(), many=True).data
