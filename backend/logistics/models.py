from django.db import models
from django.contrib.auth.models import AbstractUser
import uuid
from django.utils import timezone
from datetime import timedelta
from django.db.models import Sum
from utils.africastalking import send_sms
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
    phone = models.CharField(max_length=30)
    email = models.CharField(max_length=60)
    incomplete_trips = models.PositiveBigIntegerField(default=0)
    complete_trips = models.PositiveBigIntegerField(default=0)
    # trips = models.PositiveBigIntegerField(default=0)
    leave_date = models.DateTimeField(null=True, blank=True)
    return_date = models.DateTimeField(null=True, blank=True)
    status = models.CharField(choices=ACTION_CHOICES, default='isAvailable')

    def __str__(self):
        return f'{self.name} is {self.status}'

    def save(self, *args, **kwargs):
        # Update leave_date automatically when status is changed to 'onLeave'
        now = timezone.now()
        # If driver goes on leave for the first time
        if self.status == 'onLeave' and not self.leave_date:
            self.leave_date = now
            self.return_date = now + timedelta(minutes=5)
            print("Leave automated", self.return_date) 
        # If leave time has expired
        if self.return_date and self.return_date <= now:
                self.status = 'isAvailable'
                self.leave_date = None
                self.return_date = None
        # If driver has trips
        if self.incomplete_trips >0:
            self.status = 'onDuty'
        # If no trips and not on leave
        if self.incomplete_trips ==0 and self.status !='onLeave':
            self.status = 'isAvailable'
        # send_sms(self.phone, f"Hello {self.name}, you have been registered in our System and your status is now {self.status}.")
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
    total_vol = models.IntegerField(default=0)
    voltransported = models.IntegerField(default=0)
    pricepaid = models.IntegerField( default=0)
    price = models.IntegerField( default=0)

    def __str__(self):
        return self.name
    
    # Function to calculate the weights transported in a journey
    # def get_weight_transported(self):
        
    #     total = Journey.objects.filter(party=self, status='delivered').aggregate(total=Sum('weight')).get('total') or 0
    #     print("Total journies",total)
    #     return total
    # def save(self, *args, **kwargs):
        
    #     self.voltransported = self.get_weight_transported()
    #     super().save(*args, **kwargs)
        

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
    date = models.DateTimeField( blank=True, null=True)
    driver = models.ForeignKey(Driver, on_delete=models.SET_NULL, blank=True, null=True)
    truck = models.ForeignKey(Truck, on_delete=models.SET_NULL, blank=True, null=True)
    party = models.ForeignKey(Party, on_delete=models.CASCADE)
    startingpoint = models.CharField(max_length=100, default='Nairobi')
    destination = models.CharField(max_length=100, default='Nairobi')
    weight = models.IntegerField(default=0)
    description = models.TextField(default='goods')
    status = models.CharField(choices = ACTION_CHOICES)

    def __str__(self):
        return self.party.name
    
    def check_status(self, old_status):
        if not self.driver:
            return self.status
        if old_status not in ["inprogress", "shipping"] and self.status == 'inprogress':
            self.driver.incomplete_trips += 1
            send_sms(self.driver.phone, f"Hello {self.driver.name}, you have been assigned a new {self.weight} trip for {self.party.name} from {self.startingpoint} to {self.destination} on {self.date}. Please prepare for the trip.")
        elif old_status not in ["inprogress", "shipping"] and self.status == 'shipping':
            self.driver.incomplete_trips += 1
            send_sms(self.driver.phone, f"Hello {self.driver.name}, you have been assigned a new {self.weight} trip for {self.party.name} from {self.startingpoint} to {self.destination} on {self.date}. Please prepare for the trip.")
            
        elif old_status != 'delivered' and self.status == 'delivered':
            if self.driver.incomplete_trips > 0:
                self.driver.incomplete_trips -= 1
            self.driver.complete_trips += 1
        elif old_status == 'delivered' and self.status in ["inprogress", "shipping"]:
            if self.driver.complete_trips > 0:
                self.driver.complete_trips -= 1
            self.driver.incomplete_trips += 1
        elif old_status != 'cancelled' and self.status == 'cancelled':
            if self.driver.incomplete_trips > 0:
                self.driver.incomplete_trips -= 1

        self.driver.save()
        return self.status
    # when weight to be transported in a journey is added, update party's voltransported
    def calculate_weight(self):
        if self.status == 'delivered':
            self.party.voltransported += self.weight
            self.party.save()    
            return self.weight
        return None

    def save(self, *args, **kwargs):
        # Ensure driver only uses their own truck
        if self.driver and self.truck:
            if self.truck.driver != self.driver:
                raise ValueError("Driver can only be assigned to their own truck.")
        # Get old status if the object exists
        old_status = None
        # existing journey
        
        if self.pk and Journey.objects.filter(pk=self.pk).exists():
            old_status = Journey.objects.get(pk=self.pk).status
              
        super().save(*args, **kwargs)
        self.calculate_weight()
        self.check_status(old_status)  
       

