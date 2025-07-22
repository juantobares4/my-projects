from comments.models import Comment
from django.contrib.auth.models import User
from offer.models import Offer
from offer.repositories.offer_repository import OfferRepository

repo_offer = OfferRepository()

from typing import List, Optional


class CommentRepository:
    def get_all(self) -> List[Comment]:
        return Comment.objects.all()

    def get_by_id(self, id: int) -> Optional[Comment]:
        try:
            Comment_filter = Comment.objects.get(id=id)
        except:
            Comment_filter = None
        return Comment_filter

    def create(self, comment: str, offer: Offer, profile=User) -> Comment:

        comment = comment

        return Comment.objects.create(comment=comment, offer=offer, profile=profile)

    def filter_by_offer(self, offer: Offer) -> Optional[Comment]:
        try:
            offer_filter = Comment.objects.filter(offer=offer)
        except:
            offer_filter = None
        return offer_filter

    def delete(self, comment: Comment):
        return comment.delete()
    
    def update(self, com: Comment, comment: str) -> Comment:
        com.comment = comment

        com.save()