from django.contrib import admin
from django.urls import path,include

urlpatterns = [
    path('admin/', admin.site.urls),
    path('usuarios/',include('usuarios.urls')),
    path("intCampanas/",include("campanas.urls")),
    path("intReportes/",include("reportes.urls")),
    path("intVotaciones/",include("votaciones.urls")),
    path("comunidades/",include("comunidades.urls")),
    path("intPeticiones/",include("peticiones.urls")),
    path("intNoticias/",include("noticias.urls")),  
    path("intForo/",include("foro.urls")),
    path("intAnuncio/",include("anuncios.urls")),
    
]
