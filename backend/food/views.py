from rest_framework.generics import ListAPIView
from .models import Restaurant, FoodItem
from .serializers import RestaurantSerializer, FoodItemSerializer

from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status

from rest_framework.permissions import IsAuthenticated, AllowAny



class RestaurantListAPIView(ListAPIView):
    queryset = Restaurant.objects.all()
    serializer_class = RestaurantSerializer


class FoodItemListAPIView(ListAPIView):
    serializer_class = FoodItemSerializer

    def get_queryset(self):
        restaurant_id = self.kwargs['restaurant_id']
        return FoodItem.objects.filter(restaurant_id=restaurant_id)
    
class FoodItemListCreateAPIView(APIView):
    def get_permissions(self):
        if self.request.method == 'POST':
            return [IsAuthenticated()]
        return [AllowAny()]

    def get(self, request, restaurant_id):
        foods = FoodItem.objects.filter(restaurant_id=restaurant_id)
        serializer = FoodItemSerializer(foods, many=True)
        return Response(serializer.data)

    def post(self, request, restaurant_id):
        # Используем context для передачи дополнительных данных в сериализатор
        serializer = FoodItemSerializer(data=request.data)

        if serializer.is_valid():
            # При сохранении принудительно устанавливаем ID ресторана из URL
            serializer.save(restaurant_id=restaurant_id) 
            return Response(serializer.data, status=status.HTTP_201_CREATED)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class RestaurantListCreateAPIView(APIView):
    def get_permissions(self):
        if self.request.method == 'POST':
            return [IsAuthenticated()]
        return [AllowAny()]

    def get(self, request):
        restaurants = Restaurant.objects.all()
        serializer = RestaurantSerializer(restaurants, many=True)
        return Response(serializer.data)

    def post(self, request):
        serializer = RestaurantSerializer(data=request.data)

        if serializer.is_valid():
            # Если поле rating в модели обязательное, но его нет в запросе,
            # мы можем установить его здесь по умолчанию, если не сделали этого в модели
            serializer.save() 
            return Response(serializer.data, status=status.HTTP_201_CREATED)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    

class RestaurantDetailAPIView(APIView):

    def get_object(self, restaurant_id):
        try:
            return Restaurant.objects.get(id=restaurant_id)
        except Restaurant.DoesNotExist:
            return None

    def get(self, request, restaurant_id):
        restaurant = self.get_object(restaurant_id)
        if not restaurant:
            return Response({"error": "Not found"}, status=404)

        serializer = RestaurantSerializer(restaurant)
        return Response(serializer.data)

    def put(self, request, restaurant_id):
        restaurant = self.get_object(restaurant_id)
        if not restaurant:
            return Response({"error": "Not found"}, status=404)

        serializer = RestaurantSerializer(restaurant, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)

        return Response(serializer.errors, status=400)

    def delete(self, request, restaurant_id):
        restaurant = self.get_object(restaurant_id)
        if not restaurant:
            return Response({"error": "Not found"}, status=404)

        restaurant.delete()
        return Response({"message": "Deleted successfully"}, status=204)
    
