from flask_restful_swagger_2 import Schema


# Composite download
class CuttingPointSchemaSwagger(Schema):
    type = "object"
    properties = {
        "id": {
            "type": "integer"
        },
        "longitude": {
            "type": "number"
        },
        "latitude": {
            "type": "number"
        }
    }


class CompositeImageSchemaSwagger(Schema):
    type = "object"
    properties = {
        "datetime": {
            "type": "string"
        },
        "satellite": {
            "type": "string"
        },
        "composite": {
            "type": "string"
        },
    }


class CompositePreparingUrlSchemaSwagger(Schema):
    properties = {
        "points": CuttingPointSchemaSwagger.array(),
        "images": CompositeImageSchemaSwagger.array(),
    }


class CompositeSearchSchemaSwagger(Schema):
    properties = {
        "points": CuttingPointSchemaSwagger.array(),
        "datetime_start": {
            "type": "string"
        },
        "datetime_end": {
            "type": "string"
        }
    }
