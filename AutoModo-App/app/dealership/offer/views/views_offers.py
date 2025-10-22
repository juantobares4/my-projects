from django.contrib.auth.decorators import login_required
from django.utils.decorators import method_decorator
from django.shortcuts import render, redirect, get_object_or_404
from django.views import View
from django.urls import reverse
from offer.forms import OfferForm
from payments.forms import PaymentsForm
from comments.forms import CommentForm
from offer.models import Offer, OfferGroup, OfferImage, OfferPayment
from offer.repositories.offer_repository import OfferRepository
from offer.repositories.offer_group_repository import OfferGroupRepository
from comments.repositories.comment_repository import CommentRepository

repo_off = OfferRepository()
repo_offGroup = OfferGroupRepository()
repo_comment = CommentRepository()


class OfferList(View):
    def get(self, request):
        offer_groups = repo_offGroup.get_all()

        grouped_offers = {}
        for group in offer_groups:
            offers = repo_off.filter_by_attr(group)
            grouped_offers[group] = offers
        return render(
            request,
            "offers/list.html",
            dict(
            
                grouped_offers=grouped_offers    
            )
        )

@method_decorator(login_required(login_url='login'), name='dispatch')
class OfferCreate(View):
    def get(self, request):
        form = OfferForm()
        formPayments = PaymentsForm()

        return render(
            request,
            "offers/create.html",
            dict(form=form, formPayments=formPayments),
        )

    def post(self, request):
        form = OfferForm(request.POST)
        formPayments = PaymentsForm(request.POST)
        if form.is_valid():
            new_offer = repo_off.create(
                cars=form.cleaned_data["cars"],
                location=form.cleaned_data["location"],
                price=form.cleaned_data["price"],
                year=form.cleaned_data["year"],
                seller=request.user,
            )

            # Guardar las opciones de pago si el formulario de pagos es válido

            if formPayments.is_valid():
                for payment in formPayments.cleaned_data['payment_options']:
                    repo_off.create_payment(
                        offer=new_offer,
                        payment=payment
                    )
            
                images = request.FILES.getlist('images')  
                descriptions = request.POST.getlist('descriptions')  

                for i, image in enumerate(images):
                    description = descriptions[i] if i < len(descriptions) else ''  
                    OfferImage.objects.create(
                        offer=new_offer,
                        image=image,
                        description=description
                    )

            return redirect('listOffers')
        else:
            return render(
                request,
                'offers/create.html',
                dict(
                    form=form,
                    formPayments=formPayments
                )
            )   
        
class OfferDetail(View):
    def get(self, request, id):
        offer = repo_off.get_by_id(id)
        payments_form = repo_off.filter_payments_by_offer(offer)
        image = OfferImage.objects.filter(offer=offer)
        formComment = CommentForm()
        comments_offer = repo_comment.filter_by_offer(offer)

        return render(
            request,
            "offers/detail.html",
            dict(
                offer=offer,
                payments_form=payments_form,
                image=image,
                formComment=formComment,
                comments_offer=comments_offer,
            ),
        )

    # Este POST se crea para manejar el envio de comentarios.

    def post(self, request, id):
        offer = get_object_or_404(Offer, id=id)
        form = CommentForm(request.POST)
        if form.is_valid():
            repo_comment.create(
                comment=form.cleaned_data["comment"], offer=offer, profile=request.user
            )
            return redirect("DetailOffers", id=id)
        else:
            image = OfferImage.objects.filter(offer=offer)
            return render(
                request,
                "offers/detail.html",
                {"offer": offer, "image": image, "formComment": form},
            )

class OfferUpdate(View):
    def get(self, request, id):
        offer = repo_off.get_by_id(id=id)
        formPayments = PaymentsForm()


        initial_data = {
            'cars': offer.cars,
            'location': offer.location,
            'price': offer.location,
            'year': offer.year,
        }

        current_payments = OfferPayment.objects.filter(offer=offer).values_list('payment', flat=True)
        formPayments = PaymentsForm(initial={'payment_options': current_payments})

        form = OfferForm(initial=initial_data)

        return render(
            request,
            "offers/update.html",
            dict(
                form = form,
                # offer=offer,
                formPayments=formPayments,
            )
        )
    
    def post(self, request, id):
        form = OfferForm(request.POST)
        formPayments = PaymentsForm(request.POST)

        offer = repo_off.get_by_id(id=id)

        if form.is_valid() and formPayments.is_valid():
            updated_offer = repo_off.update(
                offer=offer,
                car=form.cleaned_data["cars"], 
                location=form.cleaned_data["location"],
                price=form.cleaned_data["price"],
                year=form.cleaned_data["year"],
            )



            # Actualizar los métodos de pago
            repo_off.update_payments(updated_offer, formPayments.cleaned_data["payment_options"])

            return redirect("listOffers")
        else:
            return render(
                request,
                "offers/update.html",
                dict(form=form, formPayments=formPayments, offer=offer),
            )

class OfferDelete(View):
    def get(self, request, id):
        offer = repo_off.get_by_id(id=id)
        repo_off.delete(offer=offer)
        return redirect("listOffers")