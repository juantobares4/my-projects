from django import forms    
from cars.models import Car
from cars.repositories.car import CarRepository
from locations.repositories.locality_repository import LocalityRepository
repo_car = CarRepository()
repo_loc = LocalityRepository()

from offer.models import Offer

class OfferForm(forms.ModelForm):
    cars = forms.ModelChoiceField(
        queryset=repo_car.get_all(),
        widget = forms.Select(attrs={'class': 'form-control', 'required': 'required'})
    
    )
    

    location = forms.ModelChoiceField(
        queryset = repo_loc.get_all(),
        widget = forms.Select(attrs={'class': 'form-control', 'required': 'required'})
        
        )

    class Meta:
        model = Offer
        fields = [
            "cars",
            "location",
            "price",
            "year"
        ]

        widgets = {
            "cars": forms.Select(),
            "location": forms.Select(),
            "price": forms.NumberInput(attrs={"class": "form-control", "max": 10000000}),
            "year": forms.NumberInput(attrs={"class": "form-control", "min": 2010})
        }

    def __init__(self, *args, **kwargs):
        super(OfferForm, self).__init__(*args, **kwargs)
        
        self.fields['location'].empty_label = 'Seleccioná una localidad'
        self.fields['cars'].empty_label = 'Seleccioná un vehículo'

# __all__ = (
#     "Media",
#     "MediaDefiningClass",
#     "Widget",
#     "TextInput",
#     "NumberInput",
#     "EmailInput",
#     "URLInput",
#     "PasswordInput",
#     "HiddenInput",
#     "MultipleHiddenInput",
#     "FileInput",
#     "ClearableFileInput",
#     "Textarea",
#     "DateInput",
#     "DateTimeInput",
#     "TimeInput",
#     "CheckboxInput",
#     "Select",
#     "NullBooleanSelect",
#     "SelectMultiple",
#     "RadioSelect",
#     "CheckboxSelectMultiple",
#     "MultiWidget",
#     "SplitDateTimeWidget",
#     "SplitHiddenDateTimeWidget",
#     "SelectDateWidget",
# )from django import forms

