from django.urls import path
from .views import ReportesCreateView, ReportesRetrieveUpdateDestroyAPIView, ReportesListApiView

urlpatterns = [
    path("reportes_create/",ReportesCreateView.as_view()),
    path("reportes_rud/<int:id>",ReportesRetrieveUpdateDestroyAPIView.as_view()),
    path("reportes_get/",ReportesListApiView.as_view())   
]   

