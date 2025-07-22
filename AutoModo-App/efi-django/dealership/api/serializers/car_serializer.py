from rest_framework import serializers
from cars.models import Brand, CarModel, Category, Car

class BrandSerializer(serializers.ModelSerializer):
    class Meta:
        model = Brand
        fields = ('name',)
    
class CarModelSerializer(serializers.ModelSerializer):
    brand = BrandSerializer()

    class Meta:
        model = CarModel
        fields = ('name', 'brand',)

class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = ('name',)

class CarSerializer(serializers.ModelSerializer):
    car_model = CarModelSerializer() 
    category = CategorySerializer()   

    class Meta:
        model = Car
        fields = ('car_model', 'category',)
