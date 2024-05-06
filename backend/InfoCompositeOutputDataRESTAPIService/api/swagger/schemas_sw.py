from flask_restful_swagger_3 import Schema


# Satellite resource
class SatelliteSchemaSwagger(Schema):
    properties = {
        'id': {
            'type': 'integer',
            'format': 'int64',
        },
        'name': {
            'type': 'string'
        },
        'tag': {
            'type': 'string'
        },
    }


# DateTime resource
class DateTimeSchemaSwagger(Schema):
    properties = {
        "times": ["time"],
    }


class DateSchemaSwagger(Schema):
    properties = {
        "dates": "dict",
    }


# Fire value
class FireValueSchemaSwagger(Schema):
    properties = {
        'id': {
            'type': 'integer',
            'format': 'int64',
        },
        'temperature': {
            'type': 'float'
        },
        'longitude': {
            'type': 'float'
        },
        'latitude': {
            'type': 'float'
        },
    }


# Composite
class CompositeSchemaSwagger(Schema):
    properties = {
        "composites": "list",
    }
