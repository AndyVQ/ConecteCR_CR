from django.urls import path
from .views import ComunidadesCreateView, ComunidadesRetrieveUpdateDestroyAPIView, ComunidadesListApiView

urlpatterns = [
    path("comunidades_create/",ComunidadesCreateView.as_view()),
    path("comunidades_rud/<int:id>",ComunidadesRetrieveUpdateDestroyAPIView.as_view()),
    path("comunidades_get/",ComunidadesListApiView.as_view())   
]   
