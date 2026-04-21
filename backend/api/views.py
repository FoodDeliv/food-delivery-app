from django.contrib.auth import authenticate
from django.contrib.auth.models import User
from rest_framework import status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.response import Response
from rest_framework_simplejwt.tokens import RefreshToken

from orders.models import Cart, CartItem
from food.models import FoodItem

# --- AUTH ---
@api_view(['POST'])
@permission_classes([AllowAny])
def register(request):
    username = request.data.get('username')
    password = request.data.get('password')
    email = request.data.get('email')
    if User.objects.filter(username=username).exists():
        return Response({'error': 'User exists'}, status=400)
    User.objects.create_user(username=username, password=password, email=email)
    return Response({'message': 'Created'}, status=201)

@api_view(['POST'])
@permission_classes([AllowAny])
def login(request):
    username = request.data.get('username')
    password = request.data.get('password')
    user = authenticate(username=username, password=password)
    if user:
        refresh = RefreshToken.for_user(user)
        return Response({
            'access': str(refresh.access_token),
            'refresh': str(refresh),
            'username': user.username
        })
    return Response({'error': 'Invalid credentials'}, status=401)

# --- CART CORE ---
@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_cart(request):
    cart, _ = Cart.objects.get_or_create(user=request.user)
    items = CartItem.objects.filter(cart=cart)
    cart_data = []
    total_price = 0
    for item in items:
        item_total = item.food_item.price * item.quantity
        total_price += item_total
        cart_data.append({
            'id': item.id,
            'food_id': item.food_item.id,
            'food_name': item.food_item.name,
            'price': item.food_item.price,
            'quantity': item.quantity,
            'item_total': item_total,
            'image': item.food_item.image.url if item.food_item.image else None
        })
    return Response({'items': cart_data, 'total_price': total_price})

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def add_to_cart(request):
    food_id = request.data.get('food_id')
    cart, _ = Cart.objects.get_or_create(user=request.user)
    try:
        food = FoodItem.objects.get(id=food_id)
        item, created = CartItem.objects.get_or_create(cart=cart, food_item=food)
        if not created:
            item.quantity += 1
        item.save()
        return Response({'status': 'added'}, status=201)
    except FoodItem.DoesNotExist:
        return Response({'error': 'Not found'}, status=404)

# --- NEW: Снятие и Очистка (для кнопок в Angular) ---
@api_view(['POST'])
@permission_classes([IsAuthenticated])
def remove_from_cart(request):
    item_id = request.data.get('item_id')
    CartItem.objects.filter(id=item_id, cart__user=request.user).delete()
    return Response({'status': 'deleted'})

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def clear_cart(request):
    Cart.objects.filter(user=request.user).delete()
    return Response({'status': 'cleared'})

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def profile(request):
    return Response({
        "username": request.user.username,
        "email": request.user.email
    })
@api_view(['POST'])
@permission_classes([IsAuthenticated])
def checkout(request):
    try:
        cart = Cart.objects.get(user=request.user)
        # Удаляем товары из корзины после "заказа"
        CartItem.objects.filter(cart=cart).delete()
        return Response({'message': 'Заказ успешно оформлен'}, status=status.HTTP_200_OK)
    except Cart.DoesNotExist:
        return Response({'error': 'Корзина не найдена'}, status=status.HTTP_404_NOT_FOUND)