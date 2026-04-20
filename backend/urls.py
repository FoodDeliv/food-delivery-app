from django.contrib import admin
from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static

urlpatterns = [
    path("admin/", admin.site.urls),
    
    # Роуты приложения API (авторизация)
    path('api/auth/', include('api.urls')),
    
    # Роуты приложения FOOD (рестораны и меню)
    path('api/food/', include('food.urls')),
]

# Добавляем обслуживание медиа-файлов (картинок), если включен DEBUG
if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)