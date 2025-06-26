from django.shortcuts import render
from rest_framework.generics import (
    ListCreateAPIView,
    RetrieveUpdateDestroyAPIView,
    RetrieveAPIView,
    ListAPIView,
)
from .serializers import ForoSerializer,ComentarioForoSerializer
from .models import Foro,ComentarioForo

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

class ComentarioForoCreateView(ListCreateAPIView):
    queryset = ComentarioForo.objects.all()
    serializer_class = ComentarioForoSerializer
    lookup_field = 'id'


class ComentarioForoRetrieveUpdateDestroyAPIView(RetrieveUpdateDestroyAPIView):
    queryset = ComentarioForo.objects.all()
    serializer_class = ComentarioForoSerializer
    lookup_field = 'id'


class ComentarioForoListApiView(ListAPIView):
    queryset = ComentarioForo.objects.all()
    serializer_class = ComentarioForoSerializer
 
class ForoRetrieveAPIView(RetrieveAPIView):
      queryset = Foro.objects.all()
      serializer_class = ForoSerializer
      lookup_field = 'id'