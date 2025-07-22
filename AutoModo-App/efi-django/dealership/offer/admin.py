from django.contrib import admin
from offer.models import Offer, OfferGroup


@admin.register(Offer)
class OfferAdmin(admin.ModelAdmin):
    list_display = (
        "cars",
        "location",
        "price",
        "year",
    )


@admin.register(OfferGroup)
class OfferGroupAdmin(admin.ModelAdmin):
    list_display = (
        "cars",
        # 'location',
    )
