from django.urls import path
from .views import NoticiaCreateView, NoticiaRetrieveUpdateDestroyAPIView, NoticiaListApiView
urlpatterns = [
    path("noticia_create/",NoticiaCreateView.as_view()),
    path("noticia_rud/<int:id>",NoticiaRetrieveUpdateDestroyAPIView.as_view()), 
    path("noticia_get/",NoticiaListApiView.as_view())
]   
