from django.urls import path, include
from .views import login, profile

urlpatterns = [
    path('login/', login),
    path('profile/', profile)
]