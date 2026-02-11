from django.core.management.base import BaseCommand
from django.utils import timezone
from datetime import timedelta
from logistics.models import Driver

class Command(BaseCommand):
    help = "Update drivers' status if their return_date has passed"

    def handle(self, *args, **kwargs):
        now = timezone.now()
        drivers_to_update = Driver.objects.filter(return_date__lte=now, status='onLeave')
        count = drivers_to_update.count()

        for driver in drivers_to_update:
            driver.status = 'isAvailable'
            driver.leave_date = None
            driver.return_date = None
            driver.save()

        self.stdout.write(self.style.SUCCESS(f"Updated {count} driver(s)"))
