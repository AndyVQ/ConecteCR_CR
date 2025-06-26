from django.db import models

class Foro(models.Model):
    usuario = models.ForeignKey("usuarios.Perfil",on_delete=models.CASCADE)
    nombre_foro = models.CharField(max_length=100,null=False,blank=False)
    descripcion_foro = models.CharField(max_length=100,null=False,blank=False)
    fecha_foro = models.DateField(null=False,blank=False)
    imagen_foro = models.TextField()
    likes_foro = models.IntegerField(default=0)

    def __str__(self):
        return self.nombre_foro

class ComentarioForo(models.Model):
    usuario = models.ForeignKey("usuarios.Perfil",on_delete=models.CASCADE)
    foro = models.ForeignKey(Foro,on_delete=models.CASCADE)
    comentario = models.TextField(null=False,blank=False)
    fecha_comentario = models.DateField(null=False,blank=False)

    def __str__(self):
        return self.comentario