from celery import shared_task
from django.utils import timezone
from .models import Driver
import json
from channels.layers import get_channel_layer
from asgiref.sync import async_to_sync


@shared_task
def update_driver_status():
    today = timezone.now()
    # Find all drivers whose return date is today or earlier and are still on leave
    drivers = Driver.objects.filter(status='onLeave', return_date__lte=today)
    for driver in drivers:
        driver.status = 'isAvailable'
        driver.return_date = None  # optional, clear leave date
        driver.leave_date = None
        driver.save()
        print("Checked drivers at", today)

        # prepare list of drivers to send to frontend
        all_drivers = list(Driver.objects.values("id","name","phone","email","incomplete_trips","complete_trips","status","license_no"))
        all_drivers = json.loads(json.dumps(all_drivers, default=str))
        #send updates via websocket
        channel_layer = get_channel_layer()
        async_to_sync(channel_layer.group_send)(
            "drivers_status",
            {
                "type":"driver_update",
                "drivers":all_drivers
            }
        )

