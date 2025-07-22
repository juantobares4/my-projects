from cars.models import CarModel, Brand
from typing import List, Optional
from cars.repositories.brand import BrandRepository
from django.shortcuts import get_object_or_404

class CarModelRepository:
    def get_all(self)->List[CarModel]:
        return CarModel.objects.all()
    
    def filter_by_id(self,id:int)->Optional[CarModel]:
        return CarModel.objects.filter(id=id).first()
    
    def get_by_id(self,id:int)->Optional[CarModel]:
        try:
            car_model = CarModel.objects.get(id=id)
        except:
            car_model = None
        return car_model
    
    def filter_by_brand(self,brand:Brand)->List[CarModel]:
        return CarModel.objects.filter(brand=brand)
    
    def create(self, name:str, brand_id:int)->CarModel:
        brand_repository = BrandRepository()
        brand = brand_repository.get_by_id(brand_id)
        car_model = CarModel.objects.create(name=name,brand=brand)
        return car_model

    def delete(self, car_model:CarModel):
        car_model.delete()
    
    def update(self, car_model:CarModel, name:str, brand_id:int) -> CarModel:
        brand = Brand.objects.get(id = brand_id)
        
        car_model.name = name
        car_model.brand = brand
        
        car_model.save()
        
        return car_model