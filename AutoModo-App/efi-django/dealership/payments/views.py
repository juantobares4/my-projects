from django.shortcuts import render, redirect
from payments.forms import PaymentsForm
from django.views import (
    View,
)
from payments.models import Payment
from payments.forms import PaymentCreateForm
from payments.repositories.paymente_repositorie import PaymentRepository

repo_payment = PaymentRepository()


class PaymentList(View):
    def get(self, request):
        payments = repo_payment.get_all()
        return render(request, "payments/list.html", dict(payments=payments))


class CreatePayment(View):
    def get(self, request):
            form = PaymentCreateForm()
            
            return render(
                request,
                'payments/create.html',
                dict(
                    form = form
                )
            )

    def post(self, request):
            form = PaymentCreateForm(request.POST)
            if form.is_valid():
                repo_payment.create(
                    nombre=form.cleaned_data['name']
                )
                return redirect ('payments_list')

class PaymentDelete(View):
    def get(self, request, id):
        payment = repo_payment.get_by_id(id=id)
        repo_payment.delete(payment=payment)
        return redirect('payments_list')
    
class PaymentUpdate(View):
    def get(self, request, id):
        payment = repo_payment.get_by_id(id=id)
        form = PaymentCreateForm(instance = payment)
        
        return render(
            request,
            'payments/update.html',
            dict(
                form = form,
                payment = payment
            
            )
        
        )
    
    def post(self,request, id):
        form = PaymentCreateForm(request.POST)
        if form.is_valid():        
            repo_payment.update(
                payment=repo_payment.get_by_id(id=id),
                nombre=form.cleaned_data["name"],
            )
          
            return redirect ('payments_list')

class PaymentDetail(View):
    def get(self, request, id):
        filter_payment = repo_payment.get_by_id(id = id)

        return render(
            request, 
            'payments/detail.html',
            dict(
                payment = filter_payment

            )

        )