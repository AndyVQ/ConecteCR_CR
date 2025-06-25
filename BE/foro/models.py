from django.db import models

class Foro(models.Model):
    usuario = models.ForeignKey("usuarios.Perfil",on_delete=models.CASCADE)
    comunidad = models.ForeignKey("comunidades.Comunidades",on_delete=models.CASCADE)
    nombre_foro = models.CharField(max_length=100,null=False,blank=False)
    descripcion_foro = models.CharField(max_length=100,null=False,blank=False)
    fecha_foro = models.DateField(null=False,blank=False)
    imagen_foro = models.TextField()
    likes_foro = models.IntegerField(default=0)

    def __str__(self):
        return self.nombre_foro
