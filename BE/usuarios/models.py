from django.db import models
from django.contrib.auth.models import User

class Perfil(models.Model):
   usuario = models.OneToOneField(User,on_delete=models.CASCADE)
   cedula_usuario = models.CharField(max_length=100, unique=True, null=False, blank=False)
   telefono_usuario = models.CharField(max_length=100)
   image_usuario=models.CharField(max_length=100, null=True, blank=True)
      
   def __str__(self):
      return self.usuario.username