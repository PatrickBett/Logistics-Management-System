from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView 
from django.contrib import admin
from django.urls import path, include
from logistics.views import home
from rest_framework import permissions
from drf_yasg.views import get_schema_view
from drf_yasg import openapi
from django.urls import path
from rest_framework.decorators import api_view
from rest_framework.response import Response



schema_view = get_schema_view(
   openapi.Info(
      title="Logistics Management API",
      default_version='v1',
      description="API for managing logistics operations",
   ),
   public=True,
   permission_classes=(permissions.AllowAny,),
)
urlpatterns = [
    path('', home, name='home'),
    path('docs/', schema_view.with_ui('swagger', cache_timeout=0)),
    path('admin/', admin.site.urls),
    # path('api/token/', TokenObtainPairView.as_view(), name='user-login-view'),
    path('api/token/refresh/', TokenRefreshView.as_view(), name='token-refresh-view'),
    path('api-auth/', include('rest_framework.urls')),
    path('api/', include('logistics.urls')),
]
