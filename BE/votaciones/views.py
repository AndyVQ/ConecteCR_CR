from django.shortcuts import render
from rest_framework.generics import ListCreateAPIView, RetrieveUpdateDestroyAPIView, ListAPIView
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .serializers import VotacionesSerializer, VotoSerializer
from .models import Votaciones, Voto
from rest_framework.permissions import IsAuthenticated,BasePermission,SAFE_METHODS

class PermisosPersonalizados(BasePermission):
    def has_permission(self, request, view):
        usuario = request.user
        
        if not usuario.is_authenticated:
            return False
        
        grupos_usuario = usuario.groups.values_list("name", flat=True)  # Traemos todos los grupos de manera seguida: usuario, moderador, administrador
        metodo_peticion = request.method
        
        if "usuario" in grupos_usuario:
            if metodo_peticion in SAFE_METHODS:
                return True
            return False
        
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

class VotacionesCreateView(ListCreateAPIView):
    permission_classes = [PermisosPersonalizados]
    queryset = Votaciones.objects.all()
    serializer_class = VotacionesSerializer 
    
class VotacionesRetrieveUpdateDestroyAPIView(RetrieveUpdateDestroyAPIView):
    permission_classes = [PermisosPersonalizados]
    queryset = Votaciones.objects.all()
    serializer_class = VotacionesSerializer
    
    lookup_field = 'id'
    
class VotacionesListApiView(ListAPIView):
    permission_classes = [PermisosPersonalizados]
    queryset = Votaciones.objects.all()
    serializer_class = VotacionesSerializer

class VotoCreateView(ListCreateAPIView):
    queryset = Voto.objects.all()
    serializer_class = VotoSerializer

    def create(self, request, *args, **kwargs):
        usuario = request.data.get("usuario")
        votacion = request.data.get("votacion")
        if Voto.objects.filter(usuario_id=usuario, votacion_id=votacion).exists():
            return Response({"detail": "Ya votó esta votación"}, status=status.HTTP_400_BAD_REQUEST)
        return super().create(request, *args, **kwargs)


class VotoVotacionID(APIView):
    def get(self, request, votacion):
        try:
            votos = Voto.objects.filter(votacion=votacion)
            serializer = VotoSerializer(votos, many=True)
            return Response(serializer.data)
        except Voto.DoesNotExist:
            return Response({"error": "No se encontraron votos para esta votación."}, status=404)

