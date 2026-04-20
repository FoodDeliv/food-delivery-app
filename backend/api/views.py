from rest_framework import generics, filters
from django_filters.rest_framework import DjangoFilterBackend
from .models import FoodItem, Restaurant
from .serializers import FoodItemSerializer, RestaurantSerializer

class FoodItemListAPIView(generics.ListAPIView):
    queryset = FoodItem.objects.select_related('restaurant').all()
    serializer_class = FoodItemSerializer
    
    filter_backends = [DjangoFilterBackend, filters.SearchFilter, filters.OrderingFilter]
    
    filterset_fields = ['restaurant_id']
    
    search_fields = ['name', 'description']
    
    ordering_fields = ['price', 'name']


    
class RestaurantListAPIView(generics.ListAPIView):
    queryset = Restaurant.objects.all()
    serializer_class = RestaurantSerializer