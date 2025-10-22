from cars.models import Car,CarModel,Category
from typing import List,Optional
from cars.repositories.car_model import CarModelRepository
from cars.repositories.category import CategoryRepository
from django.shortcuts import get_object_or_404

class CarRepository:
    def get_all(self)->List[Car]:
        return Car.objects.all()
    
    def filter_by_id(self,id:int)->Optional[Car]:
        return Car.objects.filter(id=id).first()
    
    def get_by_id(self,id:int)->Optional[Car]:
        try:
            car = Car.objects.get(id=id)
        except:
            car = None
        return car
    
    def filter_by_category(self,category:Category)->List[Car]:
        return Car.objects.filter(category=category)

    def filter_by_car_model(self,car_model:CarModel)->List[Car]:
        return Car.objects.filter(car_model=car_model)
    
    def create(self,car_model_id:int,category_id:int):
        car_model_repository = CarModelRepository()
        category_repository = CategoryRepository()
        car_model = car_model_repository.get_by_id(car_model_id) 
        category = category_repository.get_by_id(category_id)
        return Car.objects.create(car_model=car_model,category=category)
    
    def delete(self,car:Car):
        car.delete()

    def update(self,car_id:int,car_model_id:int,category_id:int):
        car = get_object_or_404(Car, id=car_id)
        car.car_model_id = car_model_id
        car.category_id = category_id
        car.save()
        return car