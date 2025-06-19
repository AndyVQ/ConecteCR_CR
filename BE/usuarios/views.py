from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework import status
from django.contrib.auth import authenticate
from rest_framework.response import Response
from django.contrib.auth.models import User
from .models import Perfil
from .serializers import PerfilSerializer
from rest_framework_simplejwt.tokens import RefreshToken,AccessToken

class ValidarUsuarioView(APIView):
    def post(self, request):
        nombre_usuario = request.data.get("username")
        clave_usuario = request.data.get("password")

        usuario = authenticate(username=nombre_usuario, password=clave_usuario)

        if usuario is not None:
            refresh = RefreshToken.for_user(usuario)
            access_token = str(refresh.access_token)
            refresh_token = str(refresh)
            grupo_usuario = usuario.groups.first().name if usuario.groups.exists() else None
            return Response({
                "exito": "Autenticación exitosa",
                "token":access_token,
                "id":usuario.id,
                "grupo": grupo_usuario,
                "refresh": refresh_token
                }, status=status.HTTP_200_OK)

        else:
            return Response({"error": "Credenciales incorrectas"}, status=status.HTTP_401_UNAUTHORIZED)
        
class CreateUserView(APIView):
    def post(self,request):
        nombre_usuario = request.data.get("username")
        primer_usuario = request.data.get("first_name")
        apellido_usuario = request.data.get("last_name")
        email_usuario = request.data.get("email")
        clave_usuario = request.data.get("password")
        cedula_usuario = request.data.get("cedula")
        telefono_usuario = request.data.get("telefono")
        image_usuario = request.data.get("image")
        
        if User.objects.filter(username=nombre_usuario).exists():
            return Response({'error': 'Usuario ya registrado'}, status=400)
        elif User.objects.filter(email=email_usuario).exists():
            return Response({'error': 'Email ya registrado'}, status=400)
        
        
        usuario = User.objects.create_user(
            username = nombre_usuario,
            first_name = primer_usuario,
            last_name = apellido_usuario,
            email = email_usuario,
            password = clave_usuario 
            
            
        )
        usuario.groups.add(2)

        Perfil.objects.create(
            usuario=usuario, 
            cedula_usuario=cedula_usuario, 
            telefono_usuario=telefono_usuario, 
            image_usuario=image_usuario 
        )
        return Response({"mensaje": "Usuario creado exitosamente"}, status=status.HTTP_201_CREATED)
    
    