from django.shortcuts import render, redirect
from django.views import View
from cars.forms import CarForm
from cars.repositories.category import CategoryRepository
from cars.repositories.car_model import CarModelRepository
from cars.repositories.car import CarRepository

car_repository = CarRepository()
category_repository = CategoryRepository()
car_models_repository = CarModelRepository()

class CarList(View):
    def get(self,request):
        cars = car_repository.get_all()
        return render (
            request,
            'cars/list.html',
            dict(cars=cars)
        )
    
class CarDelete(View):
    def get(self,request,id):
        car = car_repository.get_by_id(id=id)
        car_repository.delete(car=car)
        return redirect('car_list')
    
class CarCreate(View):
    def post(self,request):
        form = CarForm(request.POST)
        if form.is_valid():
            car_model_id = form.cleaned_data['car_model'].id
            category_id = form.cleaned_data['category'].id
            new_car = car_repository.create(car_model_id=car_model_id,category_id=category_id)
            return redirect('car_list')
        
    def get(self,request):
        form = CarForm
        return render(
            request,
            'cars/create.html',
            dict(form=form)
        )
    
class CarUpdate(View):
    def get(self,request,id):
        car=car_repository.get_by_id(id=id)
        car_models=car_models_repository.get_all()
        categories=category_repository.get_all()
        form = CarForm(instance=car)
        return render(
            request,
            'cars/update.html',
            dict(
                form = form,
                car_models = car_models,
                categories = categories,
                car = car
            
            )
        
        )
    
    def post(self,request,id):
        car_filter = car_repository.get_by_id(id=id)
        form = CarForm(request.POST, instance=car_filter)
        if form.is_valid():
            car_model_id = form.cleaned_data['car_model'].id
            category_id = form.cleaned_data['category'].id
            car_repository.update(
                car_id=car_filter.id,
                car_model_id=car_model_id,
                category_id=category_id
            )
        return redirect('car_detail',car_filter.id)
    
class CarDetail(View):
    def get(self,request,id):
        car = car_repository.get_by_id(id=id)
        return render(
            request,
            'cars/detail.html',
            dict(car=car)
        )