from offer.models import Offer, OfferPayment
from typing import List, Optional
from offer.models import OfferGroup


class OfferGroupRepository:
    def get_all(self) -> List[OfferGroup]:
        return OfferGroup.objects.all()