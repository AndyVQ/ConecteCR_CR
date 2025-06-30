from django.shortcuts import render
from rest_framework.generics import (
    ListCreateAPIView,
    RetrieveUpdateDestroyAPIView,
    RetrieveAPIView,
    ListAPIView,
)
from .serializers import ForoSerializer,ComentarioForoSerializer
from .models import Foro,ComentarioForo
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

class ForoCreateView(ListCreateAPIView):
    permission_classes = [PermisosPersonalizados]
    queryset = Foro.objects.all()
    serializer_class = ForoSerializer
    
    lookup_field = 'id'
    
class ForoRetrieveUpdateDestroyAPIView(RetrieveUpdateDestroyAPIView):
    permission_classes = [PermisosPersonalizados]
    queryset = Foro.objects.all()
    serializer_class = ForoSerializer
    lookup_field = 'id'
    
class ForoListApiView(ListAPIView):
    permission_classes = [PermisosPersonalizados]
    queryset = Foro.objects.all()
    serializer_class = ForoSerializer

class ComentarioForoCreateView(ListCreateAPIView):
    queryset = ComentarioForo.objects.all()
    serializer_class = ComentarioForoSerializer
    lookup_field = 'id'


class ComentarioForoRetrieveUpdateDestroyAPIView(RetrieveUpdateDestroyAPIView):
    queryset = ComentarioForo.objects.all()
    serializer_class = ComentarioForoSerializer
    lookup_field = 'id'


class ComentarioForoListApiView(ListAPIView):
    queryset = ComentarioForo.objects.all()
    serializer_class = ComentarioForoSerializer
 
class ForoRetrieveAPIView(RetrieveAPIView):
      queryset = Foro.objects.all()
      serializer_class = ForoSerializer
      lookup_field = 'id'