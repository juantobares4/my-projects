from django import forms
from comments.models import Comment


class CommentForm(forms.ModelForm):
    class Meta:
        model = Comment

        fields = [
            "comment",
        ]

        widgets = {
            "comment": forms.TextInput(
                attrs={"class": "form-control w-50", "placeholder": "Realizá un comentario..."}
            )
        }
