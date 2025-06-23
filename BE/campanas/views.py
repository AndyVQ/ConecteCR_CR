from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.generics import ListCreateAPIView, RetrieveUpdateDestroyAPIView, ListAPIView,RetrieveAPIView
from .serializers import CampanaSerializer, ApoyoSerializer
from .models import Campana, Apoyo
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated, BasePermission, SAFE_METHODS
from rest_framework import status

class PermisosPersonalizados(BasePermission):  
    def has_permission(self, request, view):
        usuario = request.user
        
        if not usuario.is_authenticated:
            return False
        
        grupos_usuario = usuario.groups.values_list("name", flat=True)  
        metodo_peticion = request.method
        
        if "usuario" in grupos_usuario:
            if metodo_peticion in SAFE_METHODS:
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

class CampanaCreateView(ListCreateAPIView):
    # permission_classes = [PermisosPersonalizados]
    queryset = Campana.objects.all()
    serializer_class = CampanaSerializer
    
class CampanaRetrieveUpdateDestroyAPIView(RetrieveUpdateDestroyAPIView):
    permission_classes = [PermisosPersonalizados]
    queryset = Campana.objects.all()
    serializer_class = CampanaSerializer
    
    lookup_field = 'id'
    
class CampanaListApiView(ListAPIView):
    permission_classes = [PermisosPersonalizados]
    queryset = Campana.objects.all()
    serializer_class = CampanaSerializer

class ApoyoCreateView(ListCreateAPIView):
    # permission_classes = [PermisosPersonalizados]
    queryset = Apoyo.objects.all()
    serializer_class = ApoyoSerializer

    def create(self, request, *args, **kwargs):
        usuario = request.data.get("usuario")
        campana = request.data.get("campana")
        if Apoyo.objects.filter(usuario_id=usuario, campana_id=campana).exists():
            return Response({"detail": "Ya votó esta campaña"}, status=status.HTTP_400_BAD_REQUEST)
        return super().create(request, *args, **kwargs)


class ApoyoCampanaID(APIView):
    def get(self, request, campana):
        try:
            apoyos = Apoyo.objects.filter(campana=campana)
            serializer = ApoyoSerializer(apoyos, many=True)
            return Response(serializer.data)
        except Apoyo.DoesNotExist:
            return Response({"error": "No se encontraron apoyos para esta campaña."}, status=404)
        
   