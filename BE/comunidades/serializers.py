from rest_framework.serializers import ModelSerializer
from .models import Comunidades

class ComunidadesSerializer(ModelSerializer):
    class Meta:
        model = Comunidades
        fields = "__all__"
        
        