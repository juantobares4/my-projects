from django.db import models
from offer.models import Offer
from django.contrib.auth.models import User

# Create your models here.


class Comment(models.Model):
    offer = models.ForeignKey(
        Offer, on_delete=models.CASCADE, related_name="comments", null=False
    )
    profile = models.ForeignKey(
        User, on_delete=models.PROTECT, related_name="comment", null=False
    )
    comment = models.CharField(max_length=200)

    def __str__(self):
        return self.comment
