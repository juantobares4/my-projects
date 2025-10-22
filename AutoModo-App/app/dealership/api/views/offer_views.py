from rest_framework.viewsets import ReadOnlyModelViewSet
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework import status
from django.shortcuts import get_object_or_404
from offer.models import Offer
from api.serializers.offer_serializer import OfferSerializer

class OfferReadOnlyViewSet(ReadOnlyModelViewSet):
    queryset = Offer.objects.all()
    serializer_class = OfferSerializer
    
    def list(self, request, *args, **kwargs):
        queryset = self.get_queryset()
        serializer = self.get_serializer(queryset, many=True)
        return Response(serializer.data)
    
    def retrieve(self, request, pk=None, *args, **kwargs):
        offer = get_object_or_404(self.get_queryset(), pk=pk)
        serializer = self.get_serializer(offer)
        return Response(serializer.data)