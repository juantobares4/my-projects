from offer.models import Offer, OfferPayment, OfferGroup
from typing import List, Optional
from cars.models import Car
from payments.models import Payment
from locations.models import Locality
from offer.models import Offer
from django.contrib.auth.models import User


class OfferRepository:
    def get_all(self) -> List[Offer]:
        return Offer.objects.all()

    def create(
        self,
        cars: Car,
        location: Locality,
        price: float,
        year: int,
        seller: User,
    ):
        offer = Offer(
            cars=cars,
            location=location,
            price=price,
            year=year,
            seller=seller,
        )
        offer.save()  # La clave esta en aca hacer un save y no crear el objeto en la base de datos. Eso lo hago con el super despues de haber agregado "GroupOfert"
        return offer

    def get_by_id(self, id=int) -> Optional[Offer]:
        try:
            offer = Offer.objects.get(id=id)
        except:
            offer = None
        return offer
    
    def filter_by_attr(self, attr) -> Optional[Offer]:
        try:
            offers = Offer.objects.filter(offer_group=attr)
        except:
            offers = None
        return offers

    def create_payment(self, offer=Offer, payment=Payment):
        return OfferPayment.objects.create(offer=offer, payment=payment)
    
    def update(self, offer=Offer, car=Car, location=Locality, price=int, year=int) -> Offer:
        offer.cars = car
        offer.location = location
        offer.price = price
        offer.year = year
        offer.save()
        return offer

    def update_payments(self, offer: Offer, payments: List[Payment]):
        OfferPayment.objects.filter(offer=offer).delete()
        for payment in payments:
            self.create_payment(offer=offer, payment=payment)
    
    def filter_payments_by_offer(self, offer: Offer) -> Optional[Payment]:
        payments_form = OfferPayment.objects.filter(offer=offer)
        return payments_form
    
    def delete(self, offer: Offer):
        offer.delete()
        all_offers = self.filter_by_attr(offer.offer_group)
        if all_offers.count() == 0:
            OfferGroup.objects.filter(cars=offer.cars).delete()
        
