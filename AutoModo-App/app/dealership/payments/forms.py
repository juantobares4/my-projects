from django import forms
from payments.models import Payment
from payments.repositories.paymente_repositorie import PaymentRepository

repo_pay = PaymentRepository()


class PaymentsForm(forms.ModelForm):
    payments = repo_pay.get_all()
    payment_options = forms.ModelMultipleChoiceField(
            queryset=payments,
            widget=forms.CheckboxSelectMultiple
        )

    class Meta:
        model = Payment
        fields = ["payment_options"]

class PaymentCreateForm(forms.ModelForm):
    class Meta:
        model = Payment

        fields = [
            'name',

        ]

        widgets = {
            'name': forms.TextInput(attrs = {'class': 'form-control', 'placeholder': 'Tipo de Método de Pago'})

        }