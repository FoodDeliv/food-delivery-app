from rest_framework.generics import ListAPIView
from .models import Restaurant, FoodItem
from .serializers import RestaurantSerializer, FoodItemSerializer

class RestaurantListAPIView(ListAPIView):
    queryset = Restaurant.objects.all()
    serializer_class = RestaurantSerializer


class FoodItemListAPIView(ListAPIView):
    serializer_class = FoodItemSerializer

    def get_queryset(self):
        restaurant_id = self.kwargs['restaurant_id']
        return FoodItem.objects.filter(restaurant_id=restaurant_id)