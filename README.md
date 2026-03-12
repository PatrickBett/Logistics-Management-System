# Logistics Management System.

## Dashboard

This project is a role based access logistics management system built with React and Django.
It allows administrators to monitor drivers, trucks, journeys, and parties in one place.
Drivers can register on the site only after added by the admin as one of the company's drivers.

## Features

1. Perform all CRUD Operations on drivers, trucks, journeys/order, and parties

2. Track drivers currently on leave

3. Visualize trips per driver using charts

4. Responsive UI built with Bootstrap
5. Schedule online meeting with all drivers or a single driver

## Tech Stack

1. Frontend: React, Bootstrap, CSS, Rechart, Context API

2. Backend: Django, Django REST Framework, Redis, Celery

3. Notification: Africastalking API

This dashboard is intended for internal administrative use.
![alt text](image-1.png)

![alt text](image-2.png)

![alt text](image-3.png)

![alt text](image-4.png)

![alt text](image-5.png)

![alt text](image-6.png)

![alt text](image-7.png)

![alt text](image-8.png)

![alt text](image-9.png)

# This starts Celery Beat, the scheduler
celery -A backend beat --loglevel=info

# To Start a Celery worker process.
celery -A backend worker -l info