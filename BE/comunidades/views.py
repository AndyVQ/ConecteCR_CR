# Create your views here.
from django.shortcuts import render
from rest_framework.generics import ListCreateAPIView, RetrieveUpdateDestroyAPIView, ListAPIView
from .serializers import ComunidadesSerializer
from .models import Comunidades


class ComunidadesCreateView(ListCreateAPIView):
    queryset = Comunidades.objects.all()
    serializer_class = ComunidadesSerializer
    
    lookup_field = 'id'
    
class ComunidadesRetrieveUpdateDestroyAPIView(RetrieveUpdateDestroyAPIView):
    queryset = Comunidades.objects.all()
    serializer_class = ComunidadesSerializer
    
    lookup_field = 'id'

class ComunidadesListApiView(ListAPIView):
    queryset = Comunidades.objects.all()
    serializer_class = ComunidadesSerializer