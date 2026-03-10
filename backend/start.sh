#!/bin/sh

echo "Starting Celery worker..."
celery -A backend worker -l info &

echo "Starting Celery beat..."
celery -A backend beat -l info &

echo "Starting ASGI server..."
daphne -b 0.0.0.0 -p $PORT backend.asgi:application
