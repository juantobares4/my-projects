from rest_framework.viewsets import ModelViewSet
from api.serializers.car_serializer import CarSerializer
from cars.models import Car

class CarViewSet(ModelViewSet):
    queryset = Car.objects.all()
    serializer_class = CarSerializer


