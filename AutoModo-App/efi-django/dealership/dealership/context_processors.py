from cars.models import Category 

def all_names_categories(request):
    categories = Category.objects.all()
    names = [category.name for category in categories]
    return dict(
        names_categories = names
    )

def current_username(request):
    return dict(
        username = request.user

    )