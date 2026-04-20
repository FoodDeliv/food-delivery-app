from django.contrib.auth import authenticate
from django.contrib.auth.models import User
from rest_framework import status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.response import Response
from rest_framework_simplejwt.tokens import RefreshToken
from django.db.models import Q
@api_view(['POST'])
@permission_classes([AllowAny])
def register(request):
    """
    FBV для регистрации нового пользователя.
    """
    username = request.data.get('username')
    password = request.data.get('password')
    email = request.data.get('email')

    if not username or not password:
        return Response(
            {'error': 'Username and password are required'}, 
            status=status.HTTP_400_BAD_REQUEST
        )

    if User.objects.filter(username=username).exists():
        return Response(
            {'error': 'User with this username already exists'}, 
            status=status.HTTP_400_BAD_REQUEST
        )

    try:
        # Создаем пользователя через встроенный метод Django
        User.objects.create_user(username=username, password=password, email=email)
        return Response(
            {'message': 'User created successfully'}, 
            status=status.HTTP_201_CREATED
        )
    except Exception as e:
        return Response(
            {'error': str(e)}, 
            status=status.HTTP_500_INTERNAL_SERVER_ERROR
        )

@api_view(['POST'])
@permission_classes([AllowAny])
def login(request):
    """
    FBV для авторизации и получения JWT токенов.
    """
    username = request.data.get('username')
    password = request.data.get('password')

    user = authenticate(username=username, password=password)

    if user is None:
        return Response(
            {'detail': 'No active account found with the given credentials'}, 
            status=status.HTTP_401_UNAUTHORIZED 
    )

    refresh = RefreshToken.for_user(user)

    return Response({
        'access': str(refresh.access_token),
        'refresh': str(refresh)
    })

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def profile(request):
    """
    FBV для получения данных профиля текущего юзера.
    """
    return Response({
        "message": "You are authenticated",
        "user": request.user.username,
        "email": request.user.email
    })

