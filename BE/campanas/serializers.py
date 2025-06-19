from rest_framework.serializers import ModelSerializer
from .models import Campana, Apoyo
from rest_framework import serializers

class CampanaSerializer(ModelSerializer):
    nombre_comunidad = serializers.CharField(source="comunidad.nombre_comunidad", read_only=True)
    nombre_usuario = serializers.CharField(source="usuario.usuario.username", read_only=True)
    class Meta:
        model = Campana
        fields = ["id", "nombre_usuario", "usuario", "comunidad", "nombre_campana", "descripcion_campana", "direccion_campana", "fecha_campana", "imagen_campana", "nombre_comunidad"]
        
class ApoyoSerializer(ModelSerializer):
    nombre_usuario = serializers.CharField(source="usuario.usuario.username", read_only=True)
    Campana = serializers.CharField(source="campana.nombre_campana", read_only=True)
    class Meta:
        model = Apoyo
        fields = ["id", "nombre_usuario", "usuario", "cantidad_apoyo","Campana","campana"]