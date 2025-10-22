from rest_framework.generics import ListAPIView
from cars.models import CarModel
from offer.models import Offer
from api.serializers.comments_serializer import OfferCommentsSerializer
from rest_framework.response import Response 
from django.shortcuts import get_object_or_404

class CarModelOffersListView(ListAPIView):
    """
    Comentarios vinculados a cada oferta realizada de un modelo de auto en particular.
        
    """
    # Lo defino pero no lo uso porque serializo las ofertas despues de filtradas
    serializer_class = OfferCommentsSerializer
    
    def get_queryset(self):
        car_model_id = self.kwargs.get('car_model_id')
        return Offer.objects.filter(cars__car_model_id=car_model_id)

    def list(self, request, *args, **kwargs):

# Como los metodos se ejecutan despues de que se instancio la vista y
# luego de producirse la solicitud # uso self.kwargs que tiene los parametros que pase en la solicitud via URL.
        car_model_id = self.kwargs.get('car_model_id')
        car_model = get_object_or_404(CarModel, id=car_model_id)
        
        offers = self.get_queryset()  
        serialized_offers = OfferCommentsSerializer(offers, many=True).data

        car_model_offers_comments = {
            'car_model': car_model.name,
            'comments_by_offers': serialized_offers
        }

        return Response(car_model_offers_comments)



# Trae Todos
# class CarModelOffersListView(ListAPIView):

#     serializer_class = OfferCommentsSerializer

#     def get_queryset(self):
#         return CarModel.objects.all()


#     def list(self, request, *args, **kwargs):
#         queryset = self.get_queryset()
#         car_model_offers_comments = []

#         for car_model in queryset:
            
#             offers = Offer.objects.filter(cars__car_model=car_model)

#             if offers.exists():
#                 serialized_offers = OfferCommentsSerializer(offers, many=True).data
#                 car_model_offers_comments.append({
#                     'car_model': car_model.name,
#                     'comments_by_offers': serialized_offers
#                 })
#         return Response(car_model_offers_comments)