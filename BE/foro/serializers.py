from rest_framework.serializers import ModelSerializer
from .models import Foro
from rest_framework import serializers


class ForoSerializer(ModelSerializer):
    nombre_comunidad = serializers.CharField(source="comunidad.nombre_comunidad", read_only=True)
    nombre_usuario = serializers.CharField(source="usuario.usuario.username", read_only=True)
    class Meta:
        model = Foro
        fields = ["id", "nombre_usuario", "usuario", "comunidad", "nombre_foro", "descripcion_foro", "fecha_foro", "nombre_comunidad","imagen_foro", "likes_foro"]