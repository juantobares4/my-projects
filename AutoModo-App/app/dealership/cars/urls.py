from django.urls import path

from cars.views.car_views import(
    CarList,
    CarDetail,
    CarCreate,
    CarDelete,
    CarUpdate,
)

from cars.views.category_views import(
    CategoryList,
    CategoryDetail,
    CategoryCreate,
    CategoryDelete,
    CategoryUpdate,
)

from cars.views.brand_views import(
    BrandList,
    BrandDetail,
    BrandCreate,
    BrandDelete,
    BrandUpdate,
)

from cars.views.car_model_views import(
    CarModelList,
    CarModelDetail,
    CarModelCreate,
    CarModelDelete,
    CarModelUpdate,
)

urlpatterns = [
    path(route='', view=CarList.as_view(), name='car_list'),
    path(route='create/',view=CarCreate.as_view(), name='car_create'),
    path(route='<int:id>/',view=CarDetail.as_view(),name="car_detail"),
    path(route='<int:id>/update/',view=CarUpdate.as_view(),name="car_update"),
    path(route='<int:id>/delete/',view=CarDelete.as_view(),name="car_delete"),

    path(route='category/', view=CategoryList.as_view(),name='category_list'),
    path(route='category/<int:id>/',view=CategoryDetail.as_view(),name="category_detail"),
    path(route='category/create/', view=CategoryCreate.as_view(),name='category_create'),
    path(route='category/<int:id>/delete/', view=CategoryDelete.as_view(),name='category_delete'),
    path(route='category/<int:id>/update/', view=CategoryUpdate.as_view(),name='category_update'),

    path(route='brand/', view=BrandList.as_view(),name='brand_list'),
    path(route='brand/<int:id>/',view=BrandDetail.as_view(),name="brand_detail"),
    path(route='brand/create/', view=BrandCreate.as_view(),name='brand_create'),
    path(route='brand/<int:id>/delete/', view=BrandDelete.as_view(),name='brand_delete'),
    path(route='brand/<int:id>/update/', view=BrandUpdate.as_view(),name='brand_update'),

    path(route='car_model/', view=CarModelList.as_view(),name='car_model_list'),
    path(route='car_model/<int:id>/',view=CarModelDetail.as_view(),name="car_model_detail"),
    path(route='car_model/create/', view=CarModelCreate.as_view(),name='car_model_create'),
    path(route='car_model/<int:id>/delete/', view=CarModelDelete.as_view(),name='car_model_delete'),
    path(route='car_model/<int:id>/update/', view=CarModelUpdate.as_view(),name='car_model_update'),
]