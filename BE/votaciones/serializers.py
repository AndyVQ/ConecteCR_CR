from rest_framework.serializers import ModelSerializer
from .models import Votaciones
from rest_framework import serializers

class VotacionesSerializer(ModelSerializer):
    nombre_comunidad = serializers.CharField(source="comunidad.nombre_comunidad", read_only=True)
    nombre_usuario = serializers.CharField(source="usuario.usuario.username", read_only=True)
    class Meta:
        model = Votaciones
        fields = ["id","nombre_usuario", "usuario", "comunidad", "nombre_votacion", "descripcion_votacion", "fecha_votacion", "imagen_votacion","abierta_votacion","votos_votacion", "nombre_comunidad"]