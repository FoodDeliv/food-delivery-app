from rest_framework import serializers
from .models import Restaurant, FoodItem

class FoodItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = FoodItem
        fields = '__all__'
        # Добавляем это поле, чтобы DRF не требовал его в POST-запросе
        read_only_fields = ['restaurant'] 

class RestaurantSerializer(serializers.ModelSerializer):
    # Делаем рейтинг необязательным, чтобы не было ошибки 400
    rating = serializers.FloatField(required=False, default=0.0)

    class Meta:
        model = Restaurant
        fields = '__all__'