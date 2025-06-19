from django.urls import path
from .views import AnuncioCreateView, AnuncioRetrieveUpdateDestroyAPIView, AnuncioListApiView

urlpatterns = [
    path("anuncio_create/",AnuncioCreateView.as_view()),
    path("anuncio_rud/<int:id>",AnuncioRetrieveUpdateDestroyAPIView.as_view()),
    path("anuncio_get/",AnuncioListApiView.as_view())  
]   

