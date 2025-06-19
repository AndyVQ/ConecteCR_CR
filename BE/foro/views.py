from django.shortcuts import render
from rest_framework.generics import ListCreateAPIView, RetrieveUpdateDestroyAPIView, ListAPIView
from .serializers import ForoSerializer
from .models import Foro

class ForoCreateView(ListCreateAPIView):
    queryset = Foro.objects.all()
    serializer_class = ForoSerializer
    
    lookup_field = 'id'
    
class ForoRetrieveUpdateDestroyAPIView(RetrieveUpdateDestroyAPIView):
    queryset = Foro.objects.all()
    serializer_class = ForoSerializer
    lookup_field = 'id'
    
class ForoListApiView(ListAPIView):
    queryset = Foro.objects.all()
    serializer_class = ForoSerializer