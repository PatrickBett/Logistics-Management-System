from django.urls import path

from .views import (DriverListCreateView, TruckListCreateView, 
                    DriverRegisterView, RegisterView,
                    JourneyListCreateView, PartyListCreateView, 
                    DriverRetrieveUpdateDestroyView,TruckRetrieveUpdateDestroyView,
                    PartyRetrieveUpdateDestroyView,JourneyRetrieveUpdateDestroyView,JourneyUpdateStatusView,
                    CustomTokenObtainPairView,download_drivers_csv as download_drivers_csv_view,download_trucks_csv as download_trucks_csv_view
                    ,download_journeys_csv as download_journeys_csv_view,download_parties_csv as download_parties_csv_view
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
    path('journeys/<uuid:pk>/update-status/', JourneyUpdateStatusView.as_view(), name='journey-update-status'),
    
    path('parties/', PartyListCreateView.as_view(), name='party-list-create'),
    path('parties/<uuid:pk>/', PartyRetrieveUpdateDestroyView.as_view(), name='party-retrieve-update-destroy'),

    path('drivers/download_csv/', download_drivers_csv_view, name='download-drivers-csv'),
    path('trucks/download_csv/', download_trucks_csv_view, name='download-trucks-csv'),
    path('journeys/download_csv/', download_journeys_csv_view, name='download-journeys-csv'),
    path('parties/download_csv/', download_parties_csv_view, name='download-parties-csv')
]
