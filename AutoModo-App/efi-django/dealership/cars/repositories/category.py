from cars.models import Category
from typing import List, Optional

class CategoryRepository:
    def get_all(self)->List[Category]:
        return Category.objects.all()
    
    def filter_by_id(self, id: int)->Optional[Category]:
        return Category.objects.filter(id=id).first()
    
    def get_by_id(self, id: int) -> Optional[Category]:
        try:
            category = Category.objects.get(id=id)
        except:
            category = None
        return category

    def create(self,name: str):
        category = Category.objects.filter(name=name)
        if category:
            return "Ya existe una categoría con este nombre"
        return Category.objects.create(name=name)

    def delete(self, category: Category):
        category.delete()

    def update(self,category: Category,name:str)->Category:
        category.name = name
        category.save()