from rest_framework.serializers import ModelSerializer
from .models import Votaciones, Voto
from rest_framework import serializers

class VotacionesSerializer(ModelSerializer):
    nombre_comunidad = serializers.CharField(source="comunidad.nombre_comunidad", read_only=True)
    nombre_usuario = serializers.CharField(source="usuario.usuario.username", read_only=True)
    class Meta:
        model = Votaciones
        fields = [
            "id",
            "usuario",
            "nombre_usuario",
            "comunidad",
            "nombre_comunidad",
            "nombre_votacion",
            "descripcion_votacion",
            "fecha_votacion",
            "imagen_votacion",
            "abierta_votacion",
            "votos_votacion"
        ]

class VotoSerializer(ModelSerializer):
    nombre_usuario = serializers.CharField(source="usuario.username", read_only=True)
    Votacion = serializers.CharField(source="votacion.nombre_votacion", read_only=True)
    class Meta:
        model = Voto
        fields = ["id", "nombre_usuario", "usuario", "cantidad_voto", "Votacion", "votacion"]