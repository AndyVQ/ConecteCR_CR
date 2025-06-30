from django.shortcuts import render
from rest_framework.generics import ListCreateAPIView, RetrieveUpdateDestroyAPIView, ListAPIView
from .serializers import AnuncioSerializer
from .models import Anuncio
from rest_framework.permissions import IsAuthenticated, BasePermission, SAFE_METHODS

class PermisosPersonalizados(BasePermission):  
    def has_permission(self, request, view):
        usuario = request.user
        
        if not usuario.is_authenticated:
            return False
        
        grupos_usuario = usuario.groups.values_list("name", flat=True)  
        metodo_peticion = request.method
        
        if "usuario" in grupos_usuario:
            if metodo_peticion in SAFE_METHODS or metodo_peticion in ["POST"]:
                return True
            return False
        
        if "moderador" in grupos_usuario:
            if metodo_peticion in ["POST","GET","PATCH", "DELETE","PUT"]:
                return True
            return False
        
        if "administrador" in grupos_usuario:
            if metodo_peticion in ["POST", "GET","PUT","PATCH", "DELETE"]:
                return True
            if metodo_peticion in SAFE_METHODS:
                return True
            return False
        
        return False


class AnuncioCreateView(ListCreateAPIView):
    permission_classes = [PermisosPersonalizados]
    queryset = Anuncio.objects.all()
    serializer_class = AnuncioSerializer
    
    lookup_field = 'id'
    
class AnuncioRetrieveUpdateDestroyAPIView(RetrieveUpdateDestroyAPIView):
    permission_classes = [PermisosPersonalizados]
    queryset = Anuncio.objects.all()
    serializer_class = AnuncioSerializer
    lookup_field = 'id'
    
class AnuncioListApiView(ListAPIView):
    permission_classes = [PermisosPersonalizados]
    queryset = Anuncio.objects.all()
    serializer_class = AnuncioSerializer