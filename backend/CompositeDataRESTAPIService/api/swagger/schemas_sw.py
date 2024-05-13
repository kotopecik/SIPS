from flask_restful_swagger_2 import Schema


# Composite download
class PointModel(Schema):
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


class DateTimeModel(Schema):
    type = "datetime"


class CompositeModel(Schema):
    type = "string"


class SatelliteModel(Schema):
    type = "string"


class CompositeDownloadSchemaSwagger(Schema):
    properties = {
        "points": PointModel.array(),
        "datetimes": DateTimeModel.array(),
        "composites": CompositeModel.array(),
        "satellites": SatelliteModel.array(),
        "preview": {
            "type": "boolean"
        }
    }
