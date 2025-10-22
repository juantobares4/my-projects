from locations.models import (
    Country,
    Province,
    Locality

)

from typing import List, Optional

class CountryRepository:
    def get_all(self) -> List[Country]:
        return Country.objects.all()

    def get_by_id(self, id: int) -> Optional[Country]:
        try:
            country_filter = Country.objects.get(id = id)
        
        except:
            country_filter = None

        return country_filter
    
    def filter_by_name(self, name: str) -> Optional[Country]:
        try:
            country_filter = Country.objects.get(name__iexact = name) # Insensible a mayúsculas y minúsculas
        
        except:
            country_filter = None

        return country_filter
    
    def create(self, name: str) -> Country:
        name = name

        return Country.objects.create(
            name = name

        )

    def update(self, country: Country, name: str) -> Country:
        country.name = name

        country.save()

    def delete(self, country: Country):
        return country.delete()

        
