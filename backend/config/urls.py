from django.contrib import admin
from django.urls import path, include
from django.conf import settings 
from django.conf.urls.static import static 

urlpatterns = [
<<<<<<< HEAD
    path('admin/', admin.site.urls),
    path('api/', include('food.urls')),
] 

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
=======
    path("admin/", admin.site.urls),
    path('api/auth/', include('api.urls')), # Теперь для логина будет /api/auth/login/
    path('api/food/', include('food.urls')), # Теперь для еды будет /api/food/restaurants/
]
>>>>>>> 9e5c6dc834bc0a38655557944517bd879b49b812
