from django.db import models
from django.contrib.auth.models import User

# Create your models here.
class Campana(models.Model):
    usuario = models.ForeignKey("usuarios.Perfil",on_delete=models.CASCADE)
    comunidad = models.ForeignKey("comunidades.Comunidades",on_delete=models.CASCADE)
    nombre_campana = models.CharField(max_length=100,null=False,blank=False)
    descripcion_campana = models.CharField(max_length=100,null=False,blank=False)
    direccion_campana = models.CharField(max_length=100,null=False,blank=False)
    fecha_campana = models.DateField(null=False,blank=False)
    imagen_campana = models.TextField()

    def __str__(self):
        return self.nombre_campana

class Apoyo(models.Model):
    usuario = models.ForeignKey(User, on_delete=models.CASCADE)
    campana = models.ForeignKey(Campana, on_delete=models.CASCADE)
    cantidad_apoyo = models.IntegerField(default=1)

    class Meta:
        unique_together = ("usuario", "campana")
   
    