from django.shortcuts import render
from rest_framework import generics
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework_simplejwt.views import TokenObtainPairView
from .models import Driver, Journey, Party, Truck, User
from .serializers import (DriverSerializer, UserSerializer,DriverRegisterSerializer ,
                        TruckSerializer, JourneySerializer, PartySerializer,JourneyStatusSerializer,
                        RegisterSerializer,CustomTokenObtainPairSerializer)

import csv
from .permissions import isDriver
from django.http import HttpResponse

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

def download_drivers_csv(request):
    response = HttpResponse(content_type="text/csv")
    response["Content-Disposition"] = 'attachment; filename="drivers.csv"'

    writer = csv.writer(response)
    writer.writerow(["ID", "Name", "License No", "Complete Trips", "Incomplete Trips", "Leave Date", "Return Date", "Status"])

    for driver in Driver.objects.all():
        writer.writerow([driver.id, driver.name, driver.license_no, driver.complete_trips, driver.incomplete_trips,driver.leave_date, driver.return_date, driver.status])

    return response
def download_trucks_csv(request):
    response = HttpResponse(content_type = "text/csv")
    response["Content-Disposition"] = 'attatchment;filename="trucks.csv"'

    writer = csv.writer(response)
    writer.writerow(["ID","Truck No","Type","Driver","Last Maintenance","Next Due", "Status"])

    for truck in Truck.objects.all():
        writer.writerow([truck.id, truck.truck_no, truck.type, truck.driver,truck.last_maintenance,truck.next_due,truck.status])
    return response

def download_journeys_csv(request):
    response = HttpResponse(content_type = "text/csv")
    response["Content-Disposition"] = 'attachment; filename="journeys.csv"'

    writer = csv.writer(response)
    writer.writerow(["ID","Driver","Truck","Party","Starting Point","Destination", "Weight", "Description", "Status"])

    for journey in Journey.objects.all():
        writer.writerow([journey.id, journey.driver, journey.truck, journey.party, journey.startingpoint, journey.destination, journey.weight, journey.description, journey.status])
    return response
def download_parties_csv(request):
    response = HttpResponse(content_type = "text/csv")
    response["Content-Disposition"] = 'attachment; filename="parties.csv"'

    writer = csv.writer(response)
    writer.writerow(["ID","Name","Contact Person","Phone Number", "Email","Vol Transported","Total Volume","Price","Price paid","Status"])

    for party in Party.objects.all():
        writer.writerow([party.id, party.name, party.contact_person, party.phone, party.email, party.voltransported, party.total_vol, party.price, party.pricepaid, party.status])
    return response
# custom view to allow drivers to only change the status of their journeys
class JourneyUpdateStatusView(generics.UpdateAPIView):
    serializer_class = JourneyStatusSerializer
    permission_classes = [IsAuthenticated, isDriver]
    def get_queryset(self):
        user = self.request.user
        if user.role == 'driver':
            try:
                return Journey.objects.filter(driver__user=self.request.user)
            except Driver.DoesNotExist:
                return Journey.objects.none()
        return Journey.objects.none()
