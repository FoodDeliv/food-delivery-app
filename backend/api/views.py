from rest_framework.decorators import api_view
from rest_framework.response import Response
from django.contrib.auth import authenticate
from rest_framework_simplejwt.tokens import RefreshToken

from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response

from rest_framework.permissions import AllowAny

@api_view(['POST'])
@permission_classes([AllowAny])
def login(request):
    print("DATA:", request.data)  

    username = request.data.get('username')
    password = request.data.get('password')

    print("USERNAME:", username)  
    print("PASSWORD:", password)  

    user = authenticate(username=username, password=password)

    print("USER:", user)  

    if user is None:
        return Response({'error': 'Invalid credentials'}, status=400)

    refresh = RefreshToken.for_user(user)

    return Response({
        'access': str(refresh.access_token),
        'refresh': str(refresh)
    })

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def profile(request):
    return Response({
        "message": "You are authenticated",
        "user": request.user.username
    })