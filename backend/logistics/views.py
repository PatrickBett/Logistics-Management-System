from django.shortcuts import render
from rest_framework import generics
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework_simplejwt.views import TokenObtainPairView
from .models import Driver, Journey, Party, Truck, User
from .serializers import (DriverSerializer, UserSerializer,DriverRegisterSerializer ,
                        TruckSerializer, JourneySerializer, PartySerializer,
                        RegisterSerializer,CustomTokenObtainPairSerializer)
# Create your views here.

class CustomTokenObtainPairView(TokenObtainPairView):
    serializer_class = CustomTokenObtainPairSerializer
class RegisterView(generics.CreateAPIView):
    queryset=User.objects.all()
    serializer_class = RegisterSerializer
    permission_classes = [AllowAny]
class DriverListCreateView(generics.ListCreateAPIView):
    queryset = Driver.objects.all()
    serializer_class = DriverSerializer
    permission_classes =  [IsAuthenticated]
class DriverRegisterView(generics.CreateAPIView):
    serializer_class = DriverRegisterSerializer
    permission_classes = [AllowAny]

class DriverRetrieveUpdateDestroyView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Driver.objects.all()
    serializer_class = DriverSerializer

class TruckListCreateView(generics.ListCreateAPIView):
    
    serializer_class = TruckSerializer
    permission_classes =  [IsAuthenticated]
    def get_queryset(self):
        user = self.request.user
        if user.role == 'admin':
            return Truck.objects.all()
        elif user.role == 'driver':
            return Truck.objects.filter(driver__user = user)
        return Truck.objects.none()
class TruckRetrieveUpdateDestroyView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Truck.objects.all()
    serializer_class = TruckSerializer
    permission_classes =  [IsAuthenticated]

class PartyListCreateView(generics.ListCreateAPIView):
    queryset = Party.objects.all()
    serializer_class = PartySerializer
    permission_classes =  [IsAuthenticated]
class PartyRetrieveUpdateDestroyView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Party.objects.all()
    serializer_class = PartySerializer
    permission_classes =  [IsAuthenticated]
class JourneyListCreateView(generics.ListCreateAPIView):
    serializer_class = JourneySerializer
    permission_classes =  [IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        if user.role == 'admin':
            return Journey.objects.all()
        elif user.role == 'driver':
            try:
                print("Drver...")
                return Journey.objects.filter(driver__user=self.request.user)
            
            except Driver.DoesNotExist:
                return Journey.objects.none()

        return Journey.objects.none()    

class JourneyRetrieveUpdateDestroyView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Journey.objects.all()
    serializer_class = JourneySerializer
    permission_classes =  [IsAuthenticated]

