import json

from flask import Flask
from flask_restful import Api
from flask_migrate import Migrate
from werkzeug.exceptions import HTTPException

from api.resources.composite_resource import CompositeResource
from api.resources.datetime_resource import DatetimeResource
from api.resources.fire_value_resource import FireValueResource
from api.db.base import db


app = Flask(__name__)
app.config.from_object('api.conf')

migrate = Migrate(app, db)

api = Api(app)


main_route = "/api/v1"

api.add_resource(DatetimeResource, f"{main_route}/datetime")
api.add_resource(CompositeResource, f"{main_route}/composite")
api.add_resource(FireValueResource, f"{main_route}/fire/value")


@app.errorhandler(HTTPException)
def handle_exception(e):
    """Return JSON instead of HTML for HTTP errors."""
    response = e.get_response()
    response.data = json.dumps({
        "status": e.code,
        "error": e.name,
        "message": e.description,
    })
    response.content_type = "application/json"
    return response


db.init_app(app)

with app.app_context():
    import api.db.models
    db.create_all()


if __name__ == "__main__":
    app.run(debug=True)
