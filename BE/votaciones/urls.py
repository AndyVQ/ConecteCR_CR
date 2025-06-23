from django.urls import path
from .views import (
    VotacionesCreateView,
    VotacionesRetrieveUpdateDestroyAPIView,
    VotacionesListApiView,
    VotoCreateView,
    VotoVotacionID,
)
urlpatterns = [
    path("votaciones/",VotacionesCreateView.as_view()),
    path("votaciones_rud/<int:id>",VotacionesRetrieveUpdateDestroyAPIView.as_view()),
     path("votaciones_get/",VotacionesListApiView.as_view()),
    path("votos/", VotoCreateView.as_view()),
    path("votos_votacion/<int:votacion>/", VotoVotacionID.as_view()),
]
