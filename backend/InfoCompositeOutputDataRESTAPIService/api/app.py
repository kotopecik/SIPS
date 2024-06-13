import json

from flask import Flask, jsonify, Blueprint
from flask_restful_swagger_2 import Api, get_swagger_blueprint, swagger
from flask_migrate import Migrate
from flask_cors import CORS
from flask_swagger_ui import get_swaggerui_blueprint
from werkzeug.exceptions import HTTPException

from api.common.regex_convertor import RegexConverter
from api.resources.composite_resource import CompositeResource
from api.resources.datetime_resource import DateResource, DateTimeResource
from api.resources.fire_value_resource import FireValueListResource
from api.db.base import db
from api.resources.satellite_resource import SatelliteListResource, SatelliteResource
from api.common.caching import cache


# Flask app
app = Flask(__name__)
app.url_map.converters['regex'] = RegexConverter
app.config.from_object('api.conf')

if app.config["DEBUG"]:
    migrate = Migrate(app, db)


# Cross Origin Resource Sharing
cors = CORS(app, resources={r'/api/*': {"origins": "*"}})
# cors = CORS(
#     app,
#     resources={r'/api/*': {"origins": "*"}},
#     allow_header=['Content-Type', 'Authorization']
# )


main_route = "/api/vICOD"
api_spec_url = f"{main_route}/swagger"

# Flask restful swagger 3
api = Api(
    app,
    api_spec_url=api_spec_url,
    api_version="v1.0",
    add_api_spec_resource=True,
    contact={
        "name": "API Support",
        "email": "serbinovichgs@ict.nsc.ru"
    },
    title='Service REST API Info about Composite Output Data',
    description="Service for providing info about output data after processing by the "
                "computing complex for operational data processing of the "
                "VIIRS radiometer of Suomi-NPP, NOAA-20 satellites",
    schemes=["http", "https"],
)


# Swagger
SWAGGER_URL = f"{main_route}/swagger"  # URL for exposing Swagger UI (without trailing '/')
API_URL = f"{api_spec_url}.json"  # Our API url (can of course be a local resource)

with app.app_context():
    swagger_ui_blueprint = get_swaggerui_blueprint(
        SWAGGER_URL,  # Swagger UI static files will be mapped to '{SWAGGER_URL}/dist/'
        API_URL,
        config={  # Swagger UI config overrides
            'app_name': "Swagger UI",
        }
    )

app.register_blueprint(swagger_ui_blueprint)


# Resources
api.add_resource(DateResource, f"{main_route}/dates")
api.add_resource(DateTimeResource, f"{main_route}/dates/<date>/times")

api.add_resource(CompositeResource, f"{main_route}/composites/<satellite>/<date>/<time>")

api.add_resource(FireValueListResource, f"{main_route}/fire/values/<satellite>/<date>/<resolution>")

api.add_resource(SatelliteListResource, f"{main_route}/satellites")
api.add_resource(SatelliteResource, f"{main_route}/satellites/<int:id>")


# Error handler
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


# Caching initialization
cache.init_app(app)

# Database initialization
db.init_app(app)

with app.app_context():
    import api.db.models
    db.create_all()


# Run application
if app.config["DEBUG"] and __name__ == "__main__":
    app.run(debug=app.config["DEBUG"])
