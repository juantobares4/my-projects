from django.db import models
from django.utils.translation import gettext_lazy as _

class Brand(models.Model):
    name = models.CharField(max_length=200, verbose_name=_('brand'))
    def __str__(self):
        return  self.name
    
class CarModel(models.Model):
    name = models.CharField(max_length=200,verbose_name=_('model'))
    brand = models.ForeignKey(
        Brand,
        on_delete = models.CASCADE, 
        related_name = 'brands', #related name en plural
        null=False
    )
    def __str__(self):
        return  self.name

class Category(models.Model):
    name = models.CharField(max_length=200,verbose_name=_('category'))
    def __str__(self):
        return  self.name
    
class Car(models.Model):
    car_model = models.ForeignKey(
        CarModel,
        on_delete = models.CASCADE, 
        related_name = 'car_models',
        null=False
    )
    category = models.ForeignKey(
        Category,
        on_delete = models.CASCADE, 
        related_name = 'categories',
        null=False
    )
    def __str__(self):
        return  f"{self.car_model.brand.name} {self.car_model.name} - {self.category.name} "
    