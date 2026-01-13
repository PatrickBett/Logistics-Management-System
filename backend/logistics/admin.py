from django.contrib import admin
from .models import Driver, Truck, Journey, Party, User
# Register your models here.
admin.site.register(Driver)
admin.site.register(User)
admin.site.register(Truck)
admin.site.register(Journey)
admin.site.register(Party)
