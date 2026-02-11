from celery import shared_task
from django.utils import timezone
from .models import Driver

@shared_task
def update_driver_status():
    today = timezone.now().date()
    # Find all drivers whose return date is today or earlier and are still on leave
    drivers_on_leave = Driver.objects.filter(status='onleave', leave_return_date__lte=today)
    for driver in drivers_on_leave:
        driver.status = 'isavailable'
        driver.leave_return_date = None  # optional, clear leave date
        driver.save()

