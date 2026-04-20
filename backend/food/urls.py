from django.urls import path
from django.conf import settings
from django.conf.urls.static import static
from . import views 

urlpatterns = [
    path('restaurants/', views.RestaurantListAPIView.as_view()), 
    
    path('restaurants/<int:restaurant_id>/foods/', views.FoodItemListAPIView.as_view()),
]

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)