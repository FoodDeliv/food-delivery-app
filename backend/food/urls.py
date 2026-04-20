from django.urls import path
<<<<<<< HEAD
from django.conf import settings
from django.conf.urls.static import static
from . import views 

urlpatterns = [
    path('restaurants/', views.RestaurantListAPIView.as_view()), 
    
    path('restaurants/<int:restaurant_id>/foods/', views.FoodItemListAPIView.as_view()),
]

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
=======
from .views import (
    RestaurantListCreateAPIView,
    RestaurantDetailAPIView,
    FoodItemListAPIView,
    FoodItemListCreateAPIView,
    SearchSuggestionsAPIView,
    GlobalSearchAPIView,

)

urlpatterns = [
    path('restaurants/', RestaurantListCreateAPIView.as_view()),
    path('restaurants/<int:restaurant_id>/', RestaurantDetailAPIView.as_view()),
    path('restaurants/<int:restaurant_id>/foods/', FoodItemListCreateAPIView.as_view()),
    path('search/suggestions/', SearchSuggestionsAPIView.as_view()),
    path('search/', GlobalSearchAPIView.as_view()),
]
>>>>>>> 9e5c6dc834bc0a38655557944517bd879b49b812
