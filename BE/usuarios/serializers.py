from rest_framework import serializers
from .models import Perfil

class PerfilSerializer(serializers.ModelSerializer):
    usuario_nombre = serializers.CharField(source='usuario.username', read_only=True)
    usuario_email = serializers.EmailField(source='usuario.email', read_only=True)
    usuario_nombre_completo = serializers.CharField(source='usuario.get_full_name', read_only=True)
    
    class Meta:
        model = Perfil
        fields = '__all__'