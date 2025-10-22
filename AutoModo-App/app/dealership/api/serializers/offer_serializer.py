from rest_framework import serializers
from api.serializers.car_serializer import CarSerializer
from api.serializers.locations_serialiezer import LocalitySerializer
from api.serializers.profile_serializer import UserRegisterSerializer
from api.serializers.comments_serializer import CommentSerializer
from offer.models import Offer, OfferGroup

class OfferGroupSerializer(serializers.ModelSerializer):
    class Meta:
        model = OfferGroup
        fields = ('cars',)

#El serializer de oferta lo defino asi porque de momento solo quiero traer datos.
# si quisiera hacer el post hay que modificar el "create".
class OfferSerializer(serializers.ModelSerializer):
    cars = CarSerializer()
    location = LocalitySerializer()
    offer_group = OfferGroupSerializer()
    seller = UserRegisterSerializer()

    class Meta:
        model = Offer
        fields = (
            'id',
            'cars', 
            'location',
            'price',
            'year',
            'offer_group',
            'seller', 
        )
