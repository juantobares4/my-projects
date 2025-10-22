from django.contrib.auth.decorators import login_required
from django.shortcuts import (
    redirect, 
    render
    
)

from django.utils.decorators import method_decorator
from django.views import View
from locations.forms import CountryForm
from locations.models import Country
from locations.repositories.country_repository import CountryRepository

country_repository = CountryRepository()

class CountryList(View):
    def get(self, request):
        all_countries = country_repository.get_all()

        return render(
            request,
            'country/list.html',
            dict(
                countries = all_countries

            )

        )

class CountryCreate(View):
    def get(self, request):
        country_form = CountryForm()

        return render(request, 
            'country/create.html',
            dict(
                form = country_form
                
                )

        )

    def post(self, request):
        country_form = CountryForm(request.POST)

        if country_form.is_valid():
            new_country = country_repository.create(
                name = country_form.cleaned_data['name']

            )

            return redirect('countries_list')

class CountryUpdate(View):
    def get(self, request, id):
        get_country = country_repository.get_by_id(id = id)
        country_form = CountryForm(instance = get_country)

        return render(
            request,
            'country/update.html',
            dict(
                country = get_country,
                form = country_form

            )

        )
    
    def post(self, request, id):
        filter_country = country_repository.get_by_id(id = id)
        country_form = CountryForm(request.POST, instance = filter_country)

        if country_form.is_valid():
            name = country_form.cleaned_data['name']

            country_repository.update(
                country = filter_country,
                name = name    
            
            )

            return redirect('country_detail', filter_country.id)

class CountryDelete(View):
    def get(self, request, id):
        clicked_country_to_delete = country_repository.get_by_id(id = id)

        country_repository.delete(country = clicked_country_to_delete)

        return redirect('countries_list')

class CountryDetail(View):
    def get(self, request, id):
        filter_country = country_repository.get_by_id(id = id)

        return render(
            request, 
            'country/detail.html',
            dict(
                country = filter_country

            )

        )