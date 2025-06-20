from rest_framework.serializers import ModelSerializer
from .models import Anuncio
from rest_framework import serializers


class AnuncioSerializer(ModelSerializer):
    nombre_comunidad = serializers.CharField(source="comunidad.nombre_comunidad", read_only=True)
    nombre_usuario = serializers.CharField(source="usuario.usuario.username", read_only=True)
    class Meta:
        model = Anuncio
        fields = [
            "id",
            "nombre_usuario",
            "usuario",
            "comunidad",
            "nombre_anuncio",
            "descripcion_anuncio",
            "fecha_anuncio",
            "tipo_anuncio",
            "nombre_comunidad",
            "imagen_anuncio"
        ]