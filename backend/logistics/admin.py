from django.contrib import admin
from .models import Driver, Truck, Journey, Party, User, Notifications
# Register your models here.

admin.site.register(User)
admin.site.register(Journey)
admin.site.register(Party)
@admin.register(Notifications)
class NotificationsAdmin(admin.ModelAdmin):
    list_display = ('user', 'message', 'created_at')
@admin.register(Driver)
class DriverAdmin(admin.ModelAdmin):
    list_display = ('name', 'license_no', 'status')

@admin.register(Truck)
class TruckAdmin(admin.ModelAdmin):
    list_display = ('truck_no', 'type', 'driver', 'status')
    fields = ('truck_no', 'type', 'driver', 'last_maintenance', 'next_due', 'status')

    def get_form(self, request, obj=None, **kwargs):
        form = super().get_form(request, obj, **kwargs)
        # Make driver optional in the form
        form.base_fields['driver'].required = False
        return form

