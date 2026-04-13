from django.urls import path
from .views import (
    RestaurantListCreateAPIView,
    RestaurantDetailAPIView,
    FoodItemListAPIView
)

urlpatterns = [
    path('restaurants/', RestaurantListCreateAPIView.as_view()),
    path('restaurants/<int:restaurant_id>/', RestaurantDetailAPIView.as_view()),
    path('restaurants/<int:restaurant_id>/foods/', FoodItemListAPIView.as_view()),
]