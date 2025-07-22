from django.shortcuts import (
    get_object_or_404

)

from locations.models import (
    Country,
    Province,
    Locality

)

from locations.repositories.country_repository import (
    CountryRepository    

)

from typing import List, Optional

country_repository = CountryRepository()

class ProvinceRepository:
    def get_all(self) -> List[Province]:
        return Province.objects.all()
    
    def get_by_id(self, id) -> Optional[Province]:
        try:
            province_filter = Province.objects.get(id = id)
        
        except:
            province_filter = None

        return province_filter
    
    def filter_by_name(self, name: str) -> Optional[Province]:
        try:
            province_filter = Province.objects.get(name__iexact = name) # Insensible a mayúsculas y minúsculas
        
        except:
            province_filter = None

        return province_filter

    def create(self, name: str, country_id: int) -> Province:
        get_country = country_repository.get_by_id(country_id)
        
        name = name
        
        return Province.objects.create(
            name = name,
            country = get_country

        )
    
    def update(self, province: Province, name: str, country_id: int) -> Province:
        province.name = name
        province.country = country_id

        province.save()
    
    def delete(self, province: Province):
        return province.delete()