from django.urls import path
from .views import login, profile, register, add_to_cart # Импортируем всё в одну строку

urlpatterns = [
    path('login/', login, name='login'),
    path('profile/', profile, name='profile'),
    path('register/', register, name='register'),
    path('cart/add/', add_to_cart, name='add-to-cart'),
]