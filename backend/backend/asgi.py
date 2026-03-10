import os
import django
from channels.routing import ProtocolTypeRouter, URLRouter

os.environ.setdefault("DJANGO_SETTINGS_MODULE", "backend.settings")
django.setup()  # ensures Django apps are ready
from .middleware import JWTAuthMiddlewareStack
from logistics.routing import websocket_urlpatterns
from channels.routing import URLRouter

from django.core.asgi import get_asgi_application

application = ProtocolTypeRouter({
    "http": get_asgi_application(),
    "websocket": JWTAuthMiddlewareStack(
        URLRouter(websocket_urlpatterns)
    ),
})
