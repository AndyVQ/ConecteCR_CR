from rest_framework.serializers import ModelSerializer
from .models import Peticiones
from rest_framework import serializers


class PeticionesSerializer(ModelSerializer):
    nombre_comunidad = serializers.CharField(source="comunidad.nombre_comunidad", read_only=True)
    nombre_usuario = serializers.CharField(source="usuario.usuario.username", read_only=True)
    class Meta:
        model = Peticiones
        fields = ["id", "nombre_usuario", "usuario", "comunidad", "nombre_peticion", "descripcion_peticion", "fecha_peticion", "nombre_comunidad","estado_peticion"]