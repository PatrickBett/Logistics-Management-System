from .middleware import JWTAuthMiddlewareStack
from logistics.routing import websocket_urlpatterns
from channels.routing import URLRouter
from channels.routing import ProtocolTypeRouter
from django.core.asgi import get_asgi_application

application = ProtocolTypeRouter({
    "http": get_asgi_application(),
    "websocket": JWTAuthMiddlewareStack(
        URLRouter(websocket_urlpatterns)
    ),
})
