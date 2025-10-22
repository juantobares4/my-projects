from rest_framework.routers import DefaultRouter, path
from api.views.cars_views import CarViewSet
from api.views.register_views import UserRegisterViewSet
from api.views.offer_views import OfferReadOnlyViewSet
from api.views.comments_view import CommmentViewSet
from api.views.comments_by_car_view import CarModelOffersListView

router = DefaultRouter()
router.register(r'cars', CarViewSet,'cars')
router.register(r'register', UserRegisterViewSet, 'register')
router.register(r'offers', OfferReadOnlyViewSet)
router.register(r'comments', CommmentViewSet,'comments')

urlpatterns = [
 path('commentsByCar/<int:car_model_id>/', CarModelOffersListView.as_view(), name='commentsByCar'), 
]

urlpatterns += router.urls