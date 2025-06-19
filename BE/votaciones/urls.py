from django.urls import path
from .views import VotacionesCreateView, VotacionesRetrieveUpdateDestroyAPIView, VotacionesListApiView 

urlpatterns = [
    path("votaciones/",VotacionesCreateView.as_view()),
    path("votaciones_rud/<int:id>",VotacionesRetrieveUpdateDestroyAPIView.as_view()),
    path("votaciones_get/",VotacionesListApiView.as_view())
]   
