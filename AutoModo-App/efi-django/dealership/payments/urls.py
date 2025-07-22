from django.urls import path

from payments.views import (
    CreatePayment,
    PaymentList,
    PaymentDelete,
    PaymentUpdate,
    PaymentDetail

)


urlpatterns = [
    path(route = 'create/', view = CreatePayment.as_view(), name = 'payment_create'),
    path(route = 'list/', view = PaymentList.as_view(), name = 'payments_list'),
    path(route = '<int:id>/delete/', view = PaymentDelete.as_view(), name = 'payment_delete'),
    path(route = '<int:id>/update/', view = PaymentUpdate.as_view(), name = 'payment_update'),
    path(route = '<int:id>/detail/', view = PaymentDetail.as_view(), name = 'payment_detail'),

]

