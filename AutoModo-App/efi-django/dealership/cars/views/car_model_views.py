from django.shortcuts import render, redirect
from django.views import View
from cars.forms import CarModelForm
from cars.repositories.car_model import CarModelRepository
from cars.repositories.car import CarRepository

car_model_repository = CarModelRepository()
car_repository = CarRepository()

class CarModelList(View):
    def get(self,request):
        car_models = car_model_repository.get_all()
        return render (
            request,
            'car_models/list.html',
            dict(car_models=car_models)
        )
    
class CarModelDelete(View):
    def get(self,request,id):
        car_model = car_model_repository.get_by_id(id=id)
        car_model_repository.delete(car_model=car_model)
        return redirect('car_model_list')
    
class CarModelCreate(View):
    def post(self,request):
        form = CarModelForm(request.POST)
        if form.is_valid():
            name = form.cleaned_data['name']
            brand_id = form.cleaned_data['brand'].id
            new_car_model = car_model_repository.create(name,brand_id)
            return redirect('car_model_list')
        
    def get(self,request):
        form = CarModelForm
        return render(
            request,
            'car_models/create.html',
            dict(form=form)
        )
    
class CarModelUpdate(View):
    def get(self,request,id):
        car_model=car_model_repository.get_by_id(id=id)
        cars=car_repository.get_all()
        form = CarModelForm(instance=car_model)
        return render(
            request,
            'car_models/update.html',
            dict(
                form = form,
                cars = cars, 
                car_model = car_model
            
            )
        
        )
    
    def post(self,request,id):
        car_model_filter = car_model_repository.get_by_id(id = id)
        form = CarModelForm(request.POST, instance = car_model_filter)
        
        if form.is_valid():
            name = form.cleaned_data['name']
            brand = form.cleaned_data['brand'].id
            
            car_model_repository.update(
                car_model = car_model_filter,
                name = name,
                brand_id = brand
            )

        return redirect('car_model_detail', car_model_filter.id)
    
class CarModelDetail(View):
    def get(self,request,id):
        car_model = car_model_repository.get_by_id(id=id)
        cars = car_repository.filter_by_car_model(car_model)
        return render(
            request,
            'car_models/detail.html',
            dict(car_model=car_model,cars=cars)
        )