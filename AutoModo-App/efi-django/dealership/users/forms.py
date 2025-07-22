from django import forms
from django.contrib.auth.models import User
from django.contrib.auth.forms import UserCreationForm
from django.core.exceptions import ValidationError
from .models import Profile


class UserRegisterForm(UserCreationForm):
    SELLER_CHOICES = [
        (True, "Sí"),
        (False, "No"),
    ]
    is_seller = forms.ChoiceField(
        choices=SELLER_CHOICES, help_text="Campo Requerido", label="Vendedor"
    )

    password1 = forms.CharField(
        widget=forms.PasswordInput(
            attrs={"class": "form-control m-3", "placeholder": "Contraseña"}
        )
    )

    password2 = forms.CharField(
        widget=forms.PasswordInput(
            attrs={"class": "form-control m-3", "placeholder": "Repetir contraseña"}
        )
    )

    class Meta:
        model = User
        fields = [
            "username",
            "email",
            "password1",
            "password2",
            "first_name",
            "last_name",
        ]

        widgets = {
            "username": forms.TextInput(
                attrs={"class": "form-control m-3", "placeholder": "Nombre de usuario"}
            ),
            "email": forms.EmailInput(
                attrs={
                    "class": "form-control m-3",
                    "required": "required",
                    "placeholder": "Correo Electronico",
                }
            ),
            "first_name": forms.TextInput(
                attrs={
                    "class": "form-control m-3",
                    "required": "required",
                    "placeholder": "Nombre",
                }
            ),
            "last_name": forms.TextInput(
                attrs={
                    "class": "form-control m-3",
                    "required": "required",
                    "placeholder": "Apellido",
                }
            ),
            "is_seller": forms.Select(attrs={"class": "form-control m-3"}),
        }

    def save(self, commit=True):  # Este es el commit del if
        user = super().save(
            commit=False
        )  # Este lo uso para que no guarde y poder hacerle modificaciones con cosas que haya definido mas arriba
        # user ahora es una instancia del modelo
        # User que contiene los datos del formulario
        # pero aún no está guardada en la base de datos.

        if commit:
            # Aca es donde le agregaria algo a "user"

            user.save()  # Aca es donde guardo lo que no guarde por haber puesto commit=false
            profile = user.profile
            profile.is_seller = self.cleaned_data["is_seller"]
            profile.save()
        return user