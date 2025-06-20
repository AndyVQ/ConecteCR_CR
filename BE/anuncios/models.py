from django.db import models
from django.contrib.auth.models import User
TIPO_ANUNCIO = (
    ("normal", "Normal"),
    ("grave", "Grave"),
)

class Anuncio(models.Model):
    usuario = models.ForeignKey("usuarios.Perfil",on_delete=models.CASCADE)
    comunidad = models.ForeignKey("comunidades.Comunidades",on_delete=models.CASCADE)
    nombre_anuncio = models.CharField(max_length=100,null=False,blank=False)
    descripcion_anuncio = models.CharField(max_length=100,null=False,blank=False)
    fecha_anuncio = models.DateField(null=False,blank=False)
    tipo_anuncio = models.CharField(choices=TIPO_ANUNCIO, default="normal", max_length=20)
    imagen_anuncio = models.TextField()

    def __str__(self):
        return self.nombre_anuncio