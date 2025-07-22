from django.contrib import admin
from .models import Profile


@admin.register(Profile)
class ProfileAdmin(admin.ModelAdmin):
    list_display = (
        "get_name",
        "get_last_name",
        "get_e_mail",
        "is_seller",
    )

    # Este metodo se llama solo.

    def get_queryset(self, request):
        queryset = super().get_queryset(request)
        return queryset.filter(user__is_staff=False)

    def get_name(self, obj):
        name = obj.user.first_name
        return name

    get_name.short_description = "Name"

    def get_last_name(self, obj):
        last_name = obj.user.last_name
        return last_name

    get_last_name.short_description = "Last Name"

    def get_e_mail(self, obj):
        e_mail = obj.user.email
        return e_mail

    get_e_mail.short_description = "Email"