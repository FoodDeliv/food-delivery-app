from django.contrib import admin
from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static

urlpatterns = [
    path('admin/', admin.site.urls),

    # AUTH (твоя часть)
    path('api/auth/', include('api.urls')),

    # FOOD / RESTAURANTS (Алижан)
    path('api/food/', include('food.urls')),
]

# media (твоя часть)
if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)