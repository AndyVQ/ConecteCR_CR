from django.db import models

# Create your models here.

class Noticia(models.Model):
    usuario = models.ForeignKey("usuarios.Perfil",on_delete=models.CASCADE, related_name= "usuario_noticia")
    descripcion_noticia = models.CharField(max_length=100,null=False,blank=False)
    fecha_noticia = models.DateField(null=False,blank=False)
    imagen_noticia = models.TextField()
    titular_notica = models.CharField(max_length=100)
