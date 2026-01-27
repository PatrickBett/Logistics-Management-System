from django.db import models
from django.contrib.auth.models import AbstractUser
import uuid
from django.utils import timezone
from datetime import timedelta
# Create your models here.

class User(AbstractUser):
    ROLE_CHOICES = (
        ('admin', 'Admin'),
        ('driver', 'Driver'),
    )
    role = models.CharField(max_length=10, choices=ROLE_CHOICES, default='driver')

    def is_admin(self):
        return self.role == 'admin'

    def is_driver(self):
        return self.role == 'driver'
    
class Driver(models.Model):
    user = models.OneToOneField(User, on_delete=models.SET_NULL,null=True, blank=True)

    ACTION_CHOICES =(
        ('onLeave', 'On Leave'),
        ('isAvailable','Available'),
        ('onDuty','On Duty'),
        
    )
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    license_no = models.CharField(max_length=20, unique=True)
    name = models.CharField(max_length=20)
    phone = models.CharField(max_length=12)
    email = models.CharField(max_length=60)
    trips = models.PositiveBigIntegerField(default=0)
    leave_date = models.DateTimeField(null=True, blank=True)
    return_date = models.DateTimeField(null=True, blank=True)
    status = models.CharField(choices=ACTION_CHOICES, default='isAvailable')

    def __str__(self):
        return f'{self.name} is {self.status}'
    def save(self, *args, **kwargs):
        # Update leave_date automatically when status is changed to 'onLeave'
        if self.status == 'onLeave' and not self.leave_date:
            self.leave_date = timezone.now()
            self.return_date = self.leave_date + timedelta(days=4)

            print("Leave automated")
        super().save(*args, **kwargs)
class Party(models.Model):
    ACTION_CHOICES =(
        ('isActive', 'Active'),
        ('isNotActive','Not Active'),
    )
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    name = models.CharField(max_length=100)
    contact_person = models.CharField(max_length=20)
    phone = models.CharField(max_length=12)
    email = models.CharField(max_length=60)
    status = models.CharField(choices=ACTION_CHOICES, default='isActive')
    total_vol = models.IntegerField()

    def __str__(self):
        return self.name

class Truck(models.Model):
    ACTION_CHOICES =(
        ('onMaintenance', 'Maintenance'),
        ('isGood','Good Condition'),  
    )
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    truck_no = models.CharField(max_length=10, unique=True) 
    type = models.CharField(max_length=20)
    driver = models.OneToOneField(Driver, on_delete=models.SET_NULL, null=True, blank=True)
    last_maintenance = models.DateTimeField(null=True,blank=True)
    next_due = models.DateTimeField(null=True, blank=True)
    status = models.CharField(choices= ACTION_CHOICES, default='isGood')
    

    def __str__(self):
        return self.truck_no
class Journey(models.Model):
    ACTION_CHOICES =(
        ('cancelled', 'Cancelled'),
        ('inprogress','InProgress'),
        ('shipping','Shipping'),
        ('delivered','Delivered'),
    )
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    driver = models.ForeignKey(Driver, on_delete=models.SET_NULL, blank=True, null=True)
    truck = models.ForeignKey(Truck, on_delete=models.SET_NULL, blank=True, null=True)
    party = models.ForeignKey(Party, on_delete=models.CASCADE)
    startingpoint = models.CharField(max_length=100, default='Nairobi')
    destination = models.CharField(max_length=100, default='Nairobi')
    cost = models.PositiveBigIntegerField(default=0)
    description = models.TextField(default='goods')
    status = models.CharField(choices = ACTION_CHOICES)

    def __str__(self):
        return self.party.name
    def save(self, *args, **kwargs):
        # Ensure driver only uses their own truck
        if self.driver and self.truck:
            if self.truck.driver != self.driver:
                raise ValueError("Driver can only be assigned to their own truck.")
        super().save(*args, **kwargs)

