from flask import Flask
from celery import Celery, Task


def init_celery_app(app: Flask) -> Celery:

    class FlaskTask(Task):
        def __call__(self, *args, **kwargs):
            with app.app_context():
                return self.run(*args, **kwargs)

    celery_app = Celery(app.name, task_cls=FlaskTask)
    celery_app.config_from_object("CeleryService.conf")
    celery_app.set_default()

    app.extensions["celery"] = celery_app

    celery_app.conf.beat_schedule = {
        "clear-downloaded-file": {
            "task": "CompositeDataRESTAPIService.api.celery.tasks.clear_download_files",
            "schedule": 10.0 * 60 * 40
        }
    }

    return celery_app
