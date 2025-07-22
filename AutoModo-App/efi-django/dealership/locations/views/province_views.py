from django.contrib.auth.decorators import login_required
from django.shortcuts import (
    redirect, 
    render
    
)

from django.utils.decorators import method_decorator
from django.views import View
from locations.forms import ProvinceForm
from locations.models import Province
from locations.repositories.province_repository import (
    CountryRepository,
    ProvinceRepository
    
    )

province_repository = ProvinceRepository()

class ProvinceList(View):
    def get(self, request):
        all_provinces = province_repository.get_all()

        return render(
            request,
            'province/list.html',
            dict(
                provinces = all_provinces

            )

        )
    
class ProvinceCreate(View):
    def get(self, request):
        province_form = ProvinceForm()

        return render(request, 
            'province/create.html',
            dict(
                form = province_form
                
                )

        )

    def post(self, request):
        province_form = ProvinceForm(request.POST)

        if province_form.is_valid():
            country_id = province_form.cleaned_data['country'].id
            
            new_province = province_repository.create(
                name = province_form.cleaned_data['name'],
                country_id = country_id

            )

            return redirect('provinces_list')

class ProvinceDetail(View):
    def get(self, request, id):
        filter_province = province_repository.get_by_id(id = id)

        return render(
            request, 
            'province/detail.html',
            dict(
                province = filter_province

            )

        )

class ProvinceDelete(View):
    def get(self, request, id):
        clicked_province_to_delete = province_repository.get_by_id(id = id)

        province_repository.delete(province = clicked_province_to_delete)

        return redirect('provinces_list')
    
class ProvinceUpdate(View):
    def get(self, request, id):
        get_province = province_repository.get_by_id(id = id)
        province_form = ProvinceForm(instance = get_province)

        return render(
            request,
            'province/update.html',
            dict(
                province = get_province,
                form = province_form

            )

        )

    def post(self, request, id):
        filter_province = province_repository.get_by_id(id = id)
        province_form = ProvinceForm(request.POST, instance = filter_province)
        country_repository = CountryRepository()

        if province_form.is_valid():
            name = province_form.cleaned_data['name']
            country_id = province_form.cleaned_data['country'].id
            country_instance = country_repository.get_by_id(country_id)

            province_repository.update(
                province = filter_province,
                name = name,
                country_id = country_instance
            
            )

            return redirect('province_detail', filter_province.id)