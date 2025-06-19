from django.shortcuts import render
from rest_framework.generics import ListCreateAPIView, RetrieveUpdateDestroyAPIView, ListAPIView
from .serializers import AnuncioSerializer
from .models import Anuncio

class AnuncioCreateView(ListCreateAPIView):

    queryset = Anuncio.objects.all()
    serializer_class = AnuncioSerializer
    
    lookup_field = 'id'
    
class AnuncioRetrieveUpdateDestroyAPIView(RetrieveUpdateDestroyAPIView):

    queryset = Anuncio.objects.all()
    serializer_class = AnuncioSerializer
    lookup_field = 'id'
    
class AnuncioListApiView(ListAPIView):

    queryset = Anuncio.objects.all()
    serializer_class = AnuncioSerializer