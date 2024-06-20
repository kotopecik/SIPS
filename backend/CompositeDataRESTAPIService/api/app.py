import json

from flask import Flask, jsonify, Blueprint
from flask_jwt_extended import JWTManager
from flask_restful_swagger_2 import Api, get_swagger_blueprint, Resource, swagger, Schema
from flask_migrate import Migrate
from flask_cors import CORS
from flask_swagger_ui import get_swaggerui_blueprint
from werkzeug.exceptions import HTTPException

from api.common.regex_convertor import RegexConverter
from api.db.base import db
from api.common.caching import cache
from api.resources.composite_resource import CompositePreparingUrlResource, CompositeDownloadResource, \
    CompositeSearchResource


# Flask app
app = Flask(__name__)
app.url_map.converters['regex'] = RegexConverter
app.config.from_object('api.conf')

if app.config["DEBUG"]:
    migrate = Migrate(app, db)


# Cross Origin Resource Sharing
cors = CORS(app, resources={r'/api/*': {"origins": "*"}})

# JWT
jwt = JWTManager(app)


main_route = "/api/vCD"
api_spec_url = f"{main_route}/swagger"

# Flask restful
api = Api(
    app,
    api_version='v1.0',
    api_spec_url=api_spec_url,
    add_api_spec_resource=True,
    contact={
        "name": "API Support",
        "email": "serbinovichgs@ict.nsc.ru"
    },
    title="Service REST API Composite Output Data",
    description="Service for providing download,cut images and e.t. output data after processing by the "
                "computing complex for operational data processing of the "
                "VIIRS radiometer of Suomi-NPP, NOAA-20 satellites",
    security_definitions={
        "api_key": {
            'type': 'apiKey',
            'in': 'header',
            'name': 'Authorization',
            "description": "Input example: \"Bearer \<Your token\>\"",
        }
    },
    schemes=["http", "https"],
)


#   swagger
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
api.add_resource(CompositeSearchResource, f"{main_route}/composites/search")
api.add_resource(CompositePreparingUrlResource, f"{main_route}/composites/urls")
api.add_resource(CompositeDownloadResource, f"{main_route}/composites/download/<uid>")


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
