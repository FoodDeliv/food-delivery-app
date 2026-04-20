from django.urls import path
from django.conf import settings
from django.conf.urls.static import static

from .views import (
    RestaurantListCreateAPIView,
    RestaurantDetailAPIView,
    FoodItemListAPIView,
    FoodItemListCreateAPIView,
    SearchSuggestionsAPIView,
    GlobalSearchAPIView,
)

urlpatterns = [
    # Restaurants
    path('restaurants/', RestaurantListCreateAPIView.as_view()),
    path('restaurants/<int:restaurant_id>/', RestaurantDetailAPIView.as_view()),

    # Food
    path('restaurants/<int:restaurant_id>/foods/', FoodItemListCreateAPIView.as_view()),

    # Search
    path('search/suggestions/', SearchSuggestionsAPIView.as_view()),
    path('search/', GlobalSearchAPIView.as_view()),
]

# Media (твоя часть)
if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)