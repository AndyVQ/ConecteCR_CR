from django.urls import path
from .views import ValidarUsuarioView, CreateUserView

urlpatterns = [
    path("login/", ValidarUsuarioView.as_view(), name="login"),
    path("register/", CreateUserView.as_view(), name="register")
]