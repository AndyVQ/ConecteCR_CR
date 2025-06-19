from django.db import models

GRAVEDAD = (
    ("LEVE", "Leve"),
    ("MEDIA", "Media"),
    ("ALTA", "Alta"),
)

REPORTE_OPCIONES = [
    ("rechazada", "RECHAZADA"),
    ("pendiente", "PENDIENTE"),
    ("aprobada", "APROBADA"),
]

class Reportes(models.Model):
    usuario = models.ForeignKey("usuarios.Perfil",on_delete=models.CASCADE, related_name= "usuario_reporte")
    comunidad = models.ForeignKey("comunidades.Comunidades",on_delete=models.CASCADE)
    nombre_reporte = models.CharField(max_length=100,null=False,blank=False)

    descripcion_reporte = models.CharField(max_length=100,null=False,blank=False)
    fecha_reporte = models.DateField(null=False,blank=False,auto_now_add=True)
    direccion_reportes = models.CharField(max_length=100,null=False,blank=False)
    imagen_reporte = models.TextField(null=True)
    gravedad_reporte = models.CharField(choices=GRAVEDAD,null=False,blank=False,max_length=40)
    estado_reporte = models.CharField(choices=REPORTE_OPCIONES, default="pendiente", max_length=50)