from django.contrib.auth.models import User
from django.db import models
from django.db.models.signals import post_save
from django.dispatch import receiver


class Profile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    is_seller = models.BooleanField(default=False)

    def __str__(self):
        return self.user.username

    # La señal se va a ejecutar cada vez que se ejecute User, no importa que sea en otra app.
    # Ejecutada User se ejecuta "Profile.objects.create(user=instance)" y ahi se guarda en la base de datos.
    # Profile se crea aca y despues se guarda en el save del form

    @receiver(post_save, sender=User)
    def create_user_profile(sender, instance, created, **kwargs):
        if created:
            Profile.objects.create(user=instance)
        else:
            instance.profile.save()

    @receiver(post_save, sender=User)
    def save_user_profile(sender, instance, **kwargs):
        instance.profile.save()
