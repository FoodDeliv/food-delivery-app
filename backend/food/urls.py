from django.urls import path
from .views import RestaurantListAPIView, FoodItemListAPIView

urlpatterns = [
    path('restaurants/', RestaurantListAPIView.as_view()),
    path('restaurants/<int:restaurant_id>/foods/', FoodItemListAPIView.as_view()),
]