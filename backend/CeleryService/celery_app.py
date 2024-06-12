import os
import sys

from flask import Flask

sys.path.append(os.path.join(os.getcwd(), ".."))

from .celery_init import init_celery_app
from CompositeDataRESTAPIService.api.db.base import db

app = Flask(__name__)
app.config.from_object("CompositeDataRESTAPIService.api.conf")
# app.config.from_envvar("APPLICATION_SETTINGS_COMPOSITE_DATA_SERVICE")
db.init_app(app)
celery_app = init_celery_app(app)
