from locations.models import (
    Country,
    Province,
    Locality

)

from locations.repositories.province_repository import ProvinceRepository

from typing import List, Optional

province_repository = ProvinceRepository()

class LocalityRepository:
    def get_all(self) -> List[Locality]:
        return Locality.objects.all()

    def get_by_id(self, id: int) -> Optional[Locality]:
        try:
            locality_filter = Locality.objects.get(id = id)
        
        except:
            locality_filter = None

        return locality_filter
    
    def filter_by_name(self, name: str) -> Optional[Locality]:
        try:
            locality_filter = Locality.objects.get(name__iexact = name) # Insensible a mayúsculas y minúsculas
        
        except:
            locality_filter = None

        return locality_filter

    def create(self, name: str, province_id: int) -> Locality:
        get_province = province_repository.get_by_id(province_id)
        
        name = name
        
        return Locality.objects.create(
            name = name,
            province = get_province

        )
    
    def update(self, locality: Locality, name: str, province_id: int) -> Locality:
        locality.name = name
        locality.province = province_id 

        locality.save()

    def delete(self, locality: Locality):
        return locality.delete()