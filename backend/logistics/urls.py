from django.urls import path

from .views import (DriverListCreateView, TruckListCreateView, 
                    DriverRegisterView, RegisterView,
                    JourneyListCreateView, PartyListCreateView, 
                    DriverRetrieveUpdateDestroyView,TruckRetrieveUpdateDestroyView,
                    PartyRetrieveUpdateDestroyView,JourneyRetrieveUpdateDestroyView,
                    CustomTokenObtainPairView
                    )

urlpatterns = [

    path('user/register/', RegisterView.as_view(), name='user-register-view'),
    path('token/', CustomTokenObtainPairView.as_view(), name='custom-view'),

    path('drivers/', DriverListCreateView.as_view(), name='driver-list-create'),
    path('drivers/<uuid:pk>/', DriverRetrieveUpdateDestroyView.as_view(), name='driver-retrieve-update-destroy'),
    path('auth/driver/register/', DriverRegisterView.as_view(), name='driver-register-view'),


    path('trucks/', TruckListCreateView.as_view(), name='truck-list-create'),
    path('trucks/<uuid:pk>/', TruckRetrieveUpdateDestroyView.as_view(), name='truck-retrieve-update-destroy'),

    path('journeys/', JourneyListCreateView.as_view(), name='journey-list-create'),
    path('journeys/<uuid:pk>/', JourneyRetrieveUpdateDestroyView.as_view(), name='journey-retrieve-update-destroy'),
    
    path('parties/', PartyListCreateView.as_view(), name='party-list-create'),
    path('parties/<uuid:pk>/', PartyRetrieveUpdateDestroyView.as_view(), name='party-retrieve-update-destroy'),
]
