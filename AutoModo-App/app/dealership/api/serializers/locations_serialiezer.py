from rest_framework import serializers
from locations.models import Country, Province, Locality

class CountrySerializer(serializers.ModelSerializer):
    class Meta:
        model = Country
        fields = ('name',)

class ProvinceSerializer(serializers.ModelSerializer):
    country = CountrySerializer()  

    class Meta:
        model = Province
        fields = ('name', 'country',)

class LocalitySerializer(serializers.ModelSerializer):
    province = ProvinceSerializer() 

    class Meta:
        model = Locality
        fields =  ('name', 'province',)
