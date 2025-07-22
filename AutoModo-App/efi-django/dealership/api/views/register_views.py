from rest_framework import viewsets, status
from rest_framework.response import Response
from rest_framework.permissions import AllowAny, IsAuthenticated,  IsAdminUser
from django.contrib.auth.models import User
from api.serializers.profile_serializer import UserRegisterSerializer
# from rest_framework.permissions import IsAdminUser
from rest_framework.decorators import api_view, permission_classes


class UserRegisterViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserRegisterSerializer
    # permission_classes = [IsAdminUser]
    
    def get_permissions(self):
        if self.action == 'create':
            self.permission_classes = [IsAuthenticated] 
        else:
            self.permission_classes = [AllowAny]  
        return super().get_permissions()


    def create(self, request, *args, **kwargs):
        """
        Creacion de usuario por parte de usuario staff

        Requisito = pasar usuario y contraseña de usuario staff
        """
        # El get se encarga de buscar el serialezer_class
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.save()
        headers = self.get_success_headers(serializer.data)
        
        response_data = {
            "message": "Usuario registrado exitosamente",
            "user": UserRegisterSerializer(user).data
        }
        
        return Response(
            response_data, 
            status=status.HTTP_201_CREATED, 
            headers=headers
        )
