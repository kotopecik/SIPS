from flask_jwt_extended import jwt_required
from flask_restful.reqparse import RequestParser
from flask_restful_swagger_2 import Resource, swagger
from webargs.flaskparser import use_args
from webargs import fields, validate

from api.conf import REGEX_PARAMS_SATELLITE
from api.swagger.schemas_sw import CompositeDownloadSchemaSwagger


class CompositeDownloadResource(Resource):

    @swagger.doc({
        "tags": ["CompositeDownload"],
        "summary": "Get Composites Data",
        "parameters": [
            {
                "in": "body",
                "name": "body",
                "description": "Get composite data",
                "schema": CompositeDownloadSchemaSwagger,
            },
        ],
        "responses": {
            "200": {
                "description": "Returns a satellite by id",
                "examples": {
                    "application/json": {
                        "composite": []
                    }
                }
            }
        },
        "security": [
            {"api_key": []},
        ],
     })
    @jwt_required()
    def post(self, *args, **kwargs):
        print(args, kwargs)
        return {}, 200
