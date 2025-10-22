from django.contrib.auth.decorators import login_required
from django.shortcuts import (
    redirect, 
    render
    
)

from django.utils.decorators import method_decorator
from django.views import View
from locations.forms import LocalityForm
from locations.models import Locality
from locations.repositories.locality_repository import (
    LocalityRepository,
    ProvinceRepository
    
    )

locality_repository = LocalityRepository()

class LocalityList(View):
    def get(self, request):
        all_localities = locality_repository.get_all()

        return render(
            request,
            'locality/list.html',
            dict(
                localities = all_localities

            )

        )

class LocalityCreate(View):
    def get(self, request):
        locality_form = LocalityForm()

        return render(request, 
            'locality/create.html',
            dict(
                form = locality_form
                
                )

        )

    def post(self, request):
        locality_form = LocalityForm(request.POST)

        if locality_form.is_valid():
            province_id = locality_form.cleaned_data['province'].id
            
            new_locality = locality_repository.create(
                name = locality_form.cleaned_data['name'],
                province_id = province_id

            )

            return redirect('localities_list')
        ...

class LocalityDetail(View):
    def get(self, request, id):
        filter_locality = locality_repository.get_by_id(id = id)

        return render(
            request, 
            'locality/detail.html',
            dict(
                locality = filter_locality

            )

        )
    
class LocalityDelete(View):
    def get(self, request, id):
        clicked_locality_to_delete = locality_repository.get_by_id(id = id)

        locality_repository.delete(locality = clicked_locality_to_delete)

        return redirect('localities_list')

class LocalityUpdate(View):
    def get(self, request, id):
        get_locality = locality_repository.get_by_id(id = id)
        locality_form = LocalityForm(instance = get_locality)

        return render(
            request,
            'locality/update.html',
            dict(
                locality = get_locality,
                form = locality_form

            )

        )
    
    def post(self, request, id):
        filter_locality = locality_repository.get_by_id(id = id)
        locality_form = LocalityForm(request.POST, instance = filter_locality)
        province_repository = ProvinceRepository()

        if locality_form.is_valid():
            name = locality_form.cleaned_data['name']
            province_id = locality_form.cleaned_data['province'].id
            province_instance = province_repository.get_by_id(province_id)

            locality_repository.update(
                locality = filter_locality,
                name = name,
                province_id = province_instance
            
            )

            return redirect('locality_detail', filter_locality.id)