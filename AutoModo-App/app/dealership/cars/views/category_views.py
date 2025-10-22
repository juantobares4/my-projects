from django.shortcuts import render, redirect
from django.views import View
from cars.forms import CategoryForm
from cars.repositories.category import CategoryRepository
from cars.repositories.car import CarRepository

category_repository = CategoryRepository()
car_repository = CarRepository()

class CategoryList(View):
    def get(self,request):
        categories = category_repository.get_all()
        return render (
            request,
            'categories/list.html',
            dict(categories=categories)
        )
    
class CategoryDelete(View):
    def get(self,request,id):
        category = category_repository.get_by_id(id=id)
        category_repository.delete(category=category)
        return redirect('category_list')
    
class CategoryCreate(View):
    def post(self,request):
        form = CategoryForm(request.POST)
        if form.is_valid():
            name = form.cleaned_data['name']
            new_category = category_repository.create(name)
            return redirect('category_list')
        
    def get(self,request):
        form = CategoryForm
        return render(
            request,
            'categories/create.html',
            dict(form=form)
        )
    
class CategoryUpdate(View):
    def get(self,request,id):
        category=category_repository.get_by_id(id=id)
        cars=car_repository.get_all()
        form = CategoryForm(instance=category)
        return render(
            request,
            'categories/update.html',
            dict(form=form,cars=cars, category=category)
        )
    
    def post(self,request,id):
        category_filter = category_repository.get_by_id(id=id)
        form = CategoryForm(request.POST)
        if form.is_valid():
            name = form.cleaned_data['name']
            category_repository.update(
                category=category_filter,
                name=name
            )
        return redirect('category_detail',category_filter.id)
    
class CategoryDetail(View):
    def get(self,request,id):
        category = category_repository.get_by_id(id=id)
        cars = car_repository.filter_by_category(category)
        return render(
            request,
            'categories/detail.html',
            dict(category=category,cars=cars)
        )