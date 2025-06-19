from django.shortcuts import render

# Create your views here.
from django.shortcuts import render
from rest_framework.generics import ListCreateAPIView, RetrieveUpdateDestroyAPIView, ListAPIView
from .serializers import PeticionesSerializer
from .models import Peticiones
from rest_framework.permissions import IsAuthenticated,BasePermission,SAFE_METHODS


class PermisosPersonalizados(BasePermission):
    def has_permission(self, request, view):
        usuario = request.user
        
        if not usuario.is_authenticated:
            return False
        
        grupos_usuario = usuario.groups.values_list("name",flat=True) # traemos todos los grupos de manera seguida: usuario,moderador,administrador
        metodo_peticion = request.method
        
        if "moderador" in grupos_usuario:
            if metodo_peticion in ["GET", "POST","PATCH","DELETE"]:
                return True
            return False
        
        if "usuario" in grupos_usuario:
            if metodo_peticion in ["GET", "POST", "PATCH"]:
                return False
            if metodo_peticion in SAFE_METHODS:
                return True
            return False
        
        if "administrador" in grupos_usuario:
            if metodo_peticion in ["GET", "POST", "PUT", "PATCH", "DELETE"]:
                return True
            if metodo_peticion in SAFE_METHODS:
                return True
            return False
        
        return False   

class PeticionesCreateView(ListCreateAPIView):
    permission_classes = [PermisosPersonalizados]
    queryset = Peticiones.objects.all()
    serializer_class = PeticionesSerializer
    
    lookup_field = 'id'
    
class PeticionesRetrieveUpdateDestroyAPIView(RetrieveUpdateDestroyAPIView):
    permission_classes = [PermisosPersonalizados]
    queryset = Peticiones.objects.all()
    serializer_class = PeticionesSerializer
    lookup_field = 'id'
    
class PeticionesListApiView(ListAPIView):
    permission_classes = [PermisosPersonalizados]
    queryset = Peticiones.objects.all()
    serializer_class = PeticionesSerializer
    