from django import forms
from locations.models import(
    Country,
    Province,
    Locality

)

class CountryForm(forms.ModelForm):
    class Meta:
        model = Country

        fields = [
            'name',

        ]

        widgets = {
            'name': forms.TextInput(attrs = {'class': 'form-control', 'placeholder': 'Nombre del País'})

        }

class ProvinceForm(forms.ModelForm):
    class Meta:
        model = Province

        fields = [
            'name',
            'country'

        ]

        widgets = {
            'name': forms.TextInput(attrs = {'class': 'form-control', 'placeholder': 'Nombre de la Provincia'}),
            'country': forms.Select(attrs = {'class': 'form-control text-center'})

        }

    def __init__(self, *args, **kwargs):
        super(ProvinceForm, self).__init__(*args, **kwargs)
        
        self.fields['country'].empty_label = 'Seleccione un país'


class LocalityForm(forms.ModelForm):
    class Meta:
        model = Locality

        fields = [
            'name',
            'province'

        ]

        widgets = {
            'name': forms.TextInput(attrs = {'class': 'form-control', 'placeholder': 'Nombre de la Localidad'}),
            'province': forms.Select(attrs = {'class': 'form-control text-center'})

        }

    def __init__(self, *args, **kwargs):
        super(LocalityForm, self).__init__(*args, **kwargs)
    
        self.fields['province'].empty_label = 'Seleccione una provincia'