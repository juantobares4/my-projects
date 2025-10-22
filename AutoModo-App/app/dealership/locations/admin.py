from django.contrib import admin
from locations.models import (
    Country,
    Province,
    Locality

)

@admin.register(Country)
class CountryAdmin(admin.ModelAdmin):
    list_display = (
        'name',
    
    )

@admin.register(Province)
class ProvinceAdmin(admin.ModelAdmin):
    list_display = (
        'name',
        'country_id'

    )

@admin.register(Locality)
class LocalityAdmin(admin.ModelAdmin):
    list_display = (
        'name',
        'province_id'

    )