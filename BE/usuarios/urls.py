from django.urls import path
from .views import ValidarUsuarioView, CreateUserView, UsuariosListApiView

urlpatterns = [
    path("login/", ValidarUsuarioView.as_view(), name="login"),
    path("register/", CreateUserView.as_view(), name="register"),
    path("usuarios_get/", UsuariosListApiView.as_view(), name="usuarios_get"),
    
]