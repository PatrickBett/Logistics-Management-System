from django.db import models
from django.contrib.auth.models import AbstractUser
import uuid
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
    user = models.OneToOneField(User, on_delete=models.CASCADE,null=True, blank=True)

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
    status = models.CharField(choices=ACTION_CHOICES, default='isAvailable')

    def __str__(self):
        return f'{self.name} is {self.status}'
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
    truck_no = models.CharField(max_length=10) 
    type = models.CharField(max_length=20)
    driver = models.ForeignKey(Driver, on_delete=models.CASCADE)
    last_maintenance = models.DateTimeField()
    next_due = models.DateTimeField()
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
    driver = models.ForeignKey(Driver, on_delete=models.CASCADE)
    truck = models.ForeignKey(Truck, on_delete=models.CASCADE)
    party = models.ForeignKey(Party, on_delete=models.CASCADE)
    startingpoint = models.CharField(max_length=100, default='Nairobi')
    destination = models.CharField(max_length=100, default='Nairobi')
    status = models.CharField(choices = ACTION_CHOICES)

    def __str__(self):
        return self.party.name

