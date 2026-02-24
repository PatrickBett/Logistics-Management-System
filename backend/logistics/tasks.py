from celery import shared_task
from django.utils import timezone
from .models import Driver


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

