from django.urls import path
from .views import ForoCreateView, ForoRetrieveUpdateDestroyAPIView, ForoListApiView

urlpatterns = [
    path("foro_create/",ForoCreateView.as_view()),
    path("foro_rud/<int:id>",ForoRetrieveUpdateDestroyAPIView.as_view()),
    path("foro_get/",ForoListApiView.as_view())  
]   

