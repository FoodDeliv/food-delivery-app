from django.contrib import admin
from .models import Restaurant 
from .models import FoodItem  

admin.site.register(Restaurant)
admin.site.register(FoodItem)