from django.urls import path
from .views import CampanaCreateView, CampanaRetrieveUpdateDestroyAPIView, CampanaListApiView, ApoyoCreateView,ApoyoCampanaID

urlpatterns = [
    path("campanas/",CampanaCreateView.as_view()),
    path("campanas_rud/<int:id>/",CampanaRetrieveUpdateDestroyAPIView.as_view()),
    path("campanas_get/",CampanaListApiView.as_view()),
    path("apoyos/", ApoyoCreateView.as_view()),
    path("apoyos_campana/<int:campana>/", ApoyoCampanaID.as_view())
      
]   
