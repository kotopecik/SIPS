#!/bin/bash

./CRUDAPI/manage.py collectstatic --noinput
./CRUDAPI/manage.py makemigrations regauth;
./CRUDAPI/manage.py migrate;

./CRUDAPI/manage.py create_superuser;

# shellcheck disable=SC2164
cd CRUDAPI;

gunicorn --workers 6 --bind 0.0.0.0:8000 CRUDAPI.wsgi:application;