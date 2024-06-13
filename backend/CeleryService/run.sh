#!/bin/bash

celery -A CeleryService.celery_app:celery_app worker --beat --concurrency=6