from django.urls import path
from .views import (
    OrderListCreateAPIView,
    AddToCartAPIView,
    RemoveFromCartAPIView,
    CheckoutAPIView,
    OrderHistoryAPIView,
)

urlpatterns = [
    path('orders/', OrderListCreateAPIView.as_view()),
    path('orders/history/', OrderHistoryAPIView.as_view()),
    path('cart/add/', AddToCartAPIView.as_view()),
    path('cart/remove/', RemoveFromCartAPIView.as_view()),
    path('cart/checkout/', CheckoutAPIView.as_view()),
]