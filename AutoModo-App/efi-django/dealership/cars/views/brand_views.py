from django.shortcuts import render, redirect
from django.views import View
from cars.forms import BrandForm
from cars.repositories.brand import BrandRepository
from cars.repositories.car_model import CarModelRepository

brand_repository = BrandRepository()
car_models_repository = CarModelRepository()

class BrandList(View):
    def get(self,request):
        brands = brand_repository.get_all()
        return render (
            request,
            'brands/list.html',
            dict(brands=brands)
        )
    
class BrandDelete(View):
    def get(self,request,id):
        brand = brand_repository.get_by_id(id=id)
        brand_repository.delete(brand=brand)
        return redirect('brand_list')
    
class BrandCreate(View):
    def post(self,request):
        form = BrandForm(request.POST)
        if form.is_valid():
            name = form.cleaned_data['name']
            new_brand = brand_repository.create(name)
            return redirect('brand_list')
        
    def get(self,request):
        form = BrandForm
        return render(
            request,
            'brands/create.html',
            dict(form=form)
        )
    
class BrandUpdate(View):
    def get(self,request,id):
        brand=brand_repository.get_by_id(id=id)
        car_models=car_models_repository.get_all()
        form = BrandForm(instance=brand)
        return render(
            request,
            'brands/update.html',
            dict(form=form,car_models=car_models, brand=brand)
        )
    
    def post(self,request,id):
        brand_filter = brand_repository.get_by_id(id=id)
        form = BrandForm(request.POST)
        if form.is_valid():
            name = form.cleaned_data['name']
            brand_repository.update(
                brand=brand_filter,
                name=name
            )
        return redirect('brand_list')
    
class BrandDetail(View):
    def get(self,request,id):
        brand = brand_repository.get_by_id(id=id)
        car_models = car_models_repository.filter_by_brand(brand)
        return render(
            request,
            'brands/detail.html',
            dict(brand=brand,car_models=car_models)
        )