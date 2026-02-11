from rest_framework.permissions import BasePermission

class isDriver(BasePermission):
    def has_permission(self, request, view):
        return request.user and request.user.role == 'driver'