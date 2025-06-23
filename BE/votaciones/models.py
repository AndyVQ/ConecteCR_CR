from django.db import models
from django.contrib.auth.models import User

# Create your models here.
class Votaciones(models.Model):
    usuario =  models.ForeignKey("usuarios.Perfil",on_delete=models.CASCADE)
    comunidad = models.ForeignKey("comunidades.Comunidades",on_delete=models.CASCADE)
    nombre_votacion = models.CharField(max_length=100,null=False,blank=False)
    descripcion_votacion = models.CharField(max_length=100,null=False,blank=False)
    fecha_votacion = models.DateField(null=False,blank=False)
    imagen_votacion = models.TextField()
    abierta_votacion = models.BooleanField(default=True)
    votos_votacion = models.IntegerField(default=0)

class Voto(models.Model):
    usuario = models.ForeignKey(User, on_delete=models.CASCADE)
    votacion = models.ForeignKey(Votaciones, on_delete=models.CASCADE)
    cantidad_voto = models.IntegerField(default=1)

    class Meta:
        unique_together = ("usuario", "votacion")