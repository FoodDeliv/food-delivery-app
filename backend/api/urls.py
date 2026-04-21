from django.urls import path
# Добавь checkout, remove_from_cart и clear_cart в импорт
from .views import (
    login, register, profile, 
    add_to_cart, get_cart, 
    checkout, remove_from_cart, clear_cart
)

urlpatterns = [
    path('login/', login, name='login'),
    path('profile/', profile, name='profile'),
    path('register/', register, name='register'),
    
    # Корзина
    path('cart/', get_cart, name='get_cart'),
    path('cart/add/', add_to_cart, name='add_to_cart'),
    
    # --- НОВЫЕ ПУТИ ---
    path('cart/checkout/', checkout, name='checkout'),       # Чтобы работала кнопка Place Order
    path('cart/remove/', remove_from_cart, name='remove_item'), # Чтобы работала кнопка Remove
    path('cart/clear/', clear_cart, name='clear_cart'),       # Для полной очистки
]