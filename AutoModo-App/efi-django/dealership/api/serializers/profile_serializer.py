from rest_framework import serializers
from django.contrib.auth.models import User
from rest_framework.exceptions import PermissionDenied
from users.models import Profile

class ProfileSerialezer(serializers.ModelSerializer):
    class Meta:
        model = Profile
        fields = ('is_seller',)

class UserRegisterSerializer(serializers.ModelSerializer):
    password2 = serializers.CharField(write_only=True, required=True)
    profile = ProfileSerialezer()

    class Meta:
        model = User
        fields = ('username', 'email', 'password','password2', 
        'first_name', 'last_name', 'is_staff' ,'profile',)

        extra_kwargs = {
            'password': {'write_only': True},
            'email': {'required': True},
            'is_staff': {'required': True},
            'first_name': {'required': True},
            'last_name': {'required': True}
        }

    def validate(self, attrs):
        if attrs['password'] != attrs['password2']:
            raise serializers.ValidationError({
                "password": "Las contraseñas no coinciden"
            })
        
        if not self.context['request'].user.is_staff:
            raise PermissionDenied("Solo los usuarios administradores pueden registrar nuevos usuarios.")

        return attrs

    def create(self, validated_data):
        profile_data = validated_data.pop('profile')
        password2 = validated_data.pop('password2')
        
        user = User.objects.create(
            username=validated_data['username'],
            email=validated_data['email'],
            is_staff=validated_data['is_staff'],
            first_name=validated_data['first_name'],
            last_name=validated_data['last_name']
        )
        
        user.set_password(validated_data['password'])
        user.save()

        user.profile.is_seller = profile_data.get('is_seller', False)
        user.profile.save()
        
        return user
