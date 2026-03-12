#!/bin/sh
echo "Applying database migrations..."
python manage.py migrate --noinput

echo "Collecting static files..."
python manage.py collectstatic --noinput

echo "Starting Celery worker..."
celery -A backend worker --concurrency=1 -l info &

echo "Starting Celery beat..."
celery -A backend beat -l info &

echo "Starting ASGI server..."
daphne -b 0.0.0.0 -p $PORT backend.asgi:application
