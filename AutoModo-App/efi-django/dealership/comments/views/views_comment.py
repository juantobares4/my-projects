from django.shortcuts import render, redirect
from django.views import View
from comments.repositories.comment_repository import CommentRepository
from comments.forms import CommentForm

repo_comment = CommentRepository()


class CommentDelete(View):
    def get(self, request, id):
        comment = repo_comment.get_by_id(id=id)
        repo_comment.delete(comment=comment)
        return redirect("DetailOffers", id=comment.offer.id)

class CommentUpdate(View):
    def get(self, request, id):
        comment = repo_comment.get_by_id(id=id)

        initial_data = {
            'comment': comment.comment,
        }

        form = CommentForm(initial=initial_data)

        return render(
            request,
            "update.html",
            dict(
                form = form,
                offer=comment.offer
            )
        )
    
    def post(self,request, id):
        form = CommentForm(request.POST)
        comment = repo_comment.get_by_id(id=id)
        if form.is_valid():        
            repo_comment.update(
                com=comment,
                comment=form.cleaned_data['comment']
            )

        return redirect("DetailOffers", id=comment.offer.id)