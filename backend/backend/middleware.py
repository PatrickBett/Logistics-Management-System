from urllib.parse import parse_qs
from django.contrib.auth import get_user_model
from channels.db import database_sync_to_async
from rest_framework_simplejwt.tokens import AccessToken
from django.contrib.auth.models import AnonymousUser
from channels.auth import AuthMiddlewareStack

User = get_user_model()

class JWTAuthMiddleware:
    """JWT middleware for Channels 3.x"""
    def __init__(self, app):
        self.app = app

    async def __call__(self, scope, receive, send):
        scope["user"] = AnonymousUser()

        query_string = scope.get("query_string", b"").decode()
        qs = parse_qs(query_string)
        token_list = qs.get("token", None)

        if token_list:
            access_token = token_list[0]
            try:
                valid_data = AccessToken(access_token)
                user = await database_sync_to_async(User.objects.get)(id=valid_data["user_id"])
                scope["user"] = user
            except Exception:
                pass

        return await self.app(scope, receive, send)

def JWTAuthMiddlewareStack(inner):
    """Wrap AuthMiddlewareStack with JWT middleware"""
    return JWTAuthMiddleware(AuthMiddlewareStack(inner))
