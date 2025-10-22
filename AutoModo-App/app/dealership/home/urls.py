from django.urls import path

from home.views import (
        LoginView,
        LogoutView,
        IndexView,
        RegisterView,
    )


urlpatterns = [
    path(route = '', view = IndexView.as_view(), name = 'index'),
    path(route = 'register/', view = RegisterView.as_view(), name = 'register'),
    path(route = 'login/', view = LoginView.as_view(), name = 'login'),
    path(route = 'logout/', view = LogoutView.as_view(), name = 'logout')
]