from cars.models import Brand
from typing import List, Optional

class BrandRepository:
    def get_all(self)->List[Brand]:
        return Brand.objects.all()
    
    def filter_by_id(self,id:int)->Optional[Brand]:
        return Brand.objects.filter(id=id).first()
    
    def get_by_id(self,id:int)->Optional[Brand]:
        try:
            brand = Brand.objects.get(id=id)
        except:
            brand = None
        return brand
    
    def create(self, name:str):
        brand = Brand.objects.filter(name=name)
        if brand:
            return 'Ya existe una marca con este nombre'
        return Brand.objects.create(name=name)
    
    def delete(self, brand:Brand):
        brand.delete()
    
    def update(self,brand:Brand,name:str)->Brand:
        brand.name = name
        brand.save()