from django.db import models

from django.db import models
from django.contrib.auth.models import User

class Country(models.Model):
    class Meta:
        verbose_name = 'Country'
        verbose_name_plural = 'Countries'

    name = models.CharField(max_length = 200)

    def __str__(self):
        return  self.name        

class Province(models.Model):
    class Meta: 
        verbose_name = 'Province'
        verbose_name_plural = 'Provinces'

    name = models.CharField(max_length = 200)
    country = models.ForeignKey(Country, on_delete = models.CASCADE)

    def __str__(self):
        return self.name

class Locality(models.Model):
    class Meta: 
        verbose_name = 'Locality'
        verbose_name_plural = 'Localities'

    name = models.CharField(max_length = 200)
    province = models.ForeignKey(Province, on_delete = models.CASCADE)

    def __str__(self) -> str:
        return f"{self.name} - ({self.province.name} - {self.province.country}) "