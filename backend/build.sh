#!/usr/bin/env bash
set -o errexit

cd ibdb

python manage.py migrate

python manage.py import_books

python manage.py collectstatic --no-input