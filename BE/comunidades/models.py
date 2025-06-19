from django.db import models

class Comunidades(models.Model):
    nombre_comunidad = models.CharField(max_length=100, null=False, blank=False)
    direccion_comunidad = models.CharField(max_length=100, null=False, blank=False)

    def __str__(self):
        return self.nombre_comunidad