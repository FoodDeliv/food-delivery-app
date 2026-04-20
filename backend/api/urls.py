from django.urls import path, include
from .views import login, profile, register

urlpatterns = [
    path('login/', login),
    path('profile/', profile),
    path('register/', register, name='register'),
]