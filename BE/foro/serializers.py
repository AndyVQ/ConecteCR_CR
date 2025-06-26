from rest_framework.serializers import ModelSerializer
from .models import Foro,ComentarioForo
from rest_framework import serializers


class ForoSerializer(ModelSerializer):
    nombre_usuario = serializers.CharField(source="usuario.usuario.username", read_only=True)
    class Meta:
        model = Foro
        fields = ["id", "nombre_usuario", "usuario", "nombre_foro", "descripcion_foro", "fecha_foro","imagen_foro", "likes_foro"]

class ComentarioForoSerializer(ModelSerializer):
    nombre_usuario = serializers.CharField(source="usuario.usuario.username", read_only=True)
    class Meta:
        model = ComentarioForo
        fields = ["id", "nombre_usuario", "usuario", "foro", "comentario", "fecha_comentario"]