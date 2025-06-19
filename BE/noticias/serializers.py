from rest_framework.serializers import ModelSerializer
from .models import Noticia
from rest_framework import serializers

class NoticiaSerializer(ModelSerializer):
    nombre_usuario = serializers.CharField(source="usuario.usuario.username", read_only=True)
    class Meta:
        model = Noticia
        fields = "__all__"