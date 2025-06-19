from django.shortcuts import render

# Create your views here.
from django.shortcuts import render
from rest_framework.generics import ListCreateAPIView, RetrieveUpdateDestroyAPIView, ListAPIView
from .serializers import NoticiaSerializer
from .models import Noticia
from rest_framework.permissions import IsAuthenticated, BasePermission, SAFE_METHODS

class PermisosPersonalizados(BasePermission):
    def has_permission(self, request, view):
        usuario = request.user
        
        if not usuario.is_authenticated:
            return False
        
        grupos_usuario = usuario.groups.values_list("name", flat=True)
        metodo_peticion = request.method
        
        if "moderador" in grupos_usuario:
            if metodo_peticion in ["GET", "POST", "PATCH", "DELETE"]:
                return True
            return False
        
        if "administrador" in grupos_usuario:
            if metodo_peticion in ["GET", "POST", "PUT", "PATCH", "DELETE"]:
                return True
            if metodo_peticion in SAFE_METHODS:
                return True
            return False
        
        return False

class NoticiaCreateView(ListCreateAPIView):
    queryset = Noticia.objects.all()
    serializer_class = NoticiaSerializer
    
    lookup_field = 'id'
    
class NoticiaRetrieveUpdateDestroyAPIView(RetrieveUpdateDestroyAPIView):
    queryset = Noticia.objects.all()
    serializer_class = NoticiaSerializer
    
    lookup_field = 'id'

class NoticiaListApiView(ListAPIView):
    queryset = Noticia.objects.all()
    serializer_class = NoticiaSerializer
    