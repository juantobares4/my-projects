from django import forms
from cars.models import (
    Brand,
    Car,
    CarModel,
    Category,
)

class BrandForm(forms.ModelForm):
    class Meta:
        model = Brand
        
        fields = [
            'name'
        ]
        
        widgets = {
            'name': forms.TextInput(attrs = {'class': 'form-control', 'placeholder': 'Nombre de la Marca'})
        }

class CategoryForm(forms.ModelForm):
    class Meta:
        model = Category
        
        fields = [
            'name'
        ]
        
        widgets = {
            'name': forms.TextInput(attrs = {'class': 'form-control', 'placeholder': 'Nombre de la Categoría'})
        }

class CarModelForm(forms.ModelForm):
    class Meta:
        model = CarModel
        
        fields = [
            'name',
            'brand',
        ]

        widgets = {
            'name': forms.TextInput(attrs = {'class': 'form-control', 'placeholder': 'Nombre del Modelo'}),
            'brand': forms.Select(attrs = {'class': 'form-control text-center'})
        }

    def __init__(self, *args, **kwargs):
        super(CarModelForm, self).__init__(*args, **kwargs)
    
        self.fields['brand'].empty_label = 'Marca'

class CarForm(forms.ModelForm):
    class Meta:
        model = Car
        
        fields = [
            'car_model',
            'category',
        ]
        
        widgets = {
            'car_model': forms.Select(attrs = {'class': 'form-control'}),
            'category': forms.Select(attrs = {'class': 'form-control text-center'})
        }
    
    def __init__(self, *args, **kwargs):
        super(CarForm, self).__init__(*args, **kwargs)
    
        self.fields['car_model'].empty_label = 'Modelo de vehículo'
        self.fields['category'].empty_label = 'Categoría'