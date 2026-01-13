from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView 
from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/token/', TokenObtainPairView.as_view(), name='user-login-view'),
    path('api/token/refresh/', TokenRefreshView.as_view(), name='token-refresh-view'),
    path('api-auth/', include('rest_framework.urls')),
    path('api/', include('logistics.urls')),
]
