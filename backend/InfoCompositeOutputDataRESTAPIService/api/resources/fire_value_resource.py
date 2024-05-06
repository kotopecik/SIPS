from datetime import timedelta, date as d, datetime

from flask_restful_swagger_3 import swagger, Resource
from webargs import fields, validate
from webargs.flaskparser import use_args

from api.common.fire_value import FireValue
from api.common.caching import cache
from api.db.schemas import FireValueSchema
from api.swagger.schemas_sw import FireValueSchemaSwagger
from api.conf import REGEX_PARAMS_SATELLITE


class FireValueListResource(Resource):

    @swagger.tags(['FireValue'])
    @swagger.reorder_with(
        FireValueSchemaSwagger,
        as_list=True,
        description="Returns a fire value by date, satellite",
        summary="Get Fire values"
    )
    @swagger.parameters([{
        'in': 'query',
        'name': 'time',
        'schema': {"type": "string"},
        'description': 'time'
    }, {
        'in': 'query',
        'name': 'resolution',
        'schema': {"type": "string"},
        'description': '375m or 750n'
    }])
    @use_args({
        "time":       fields.Time(format="%H-%M", required=False),
        "resolution": fields.Time(format="%H-%M", required=False),
    }, location="query")
    @use_args({
        "satellite":  fields.String(required=True, validate=validate.Regexp(REGEX_PARAMS_SATELLITE)),
        "date":       fields.Date(format="%Y-%m-%d", required=True),
    }, location="view_args")
    def get(self, *args, **kwargs):
        date = args[1]['date']
        satellite_tag = kwargs['satellite']
        time = args[0].get('time')
        resolution = kwargs['resolution']

        tmp_key = f"fire_value_{satellite_tag}_{date}"
        key = tmp_key if not time else tmp_key + f"_{time}"

        cached_fire_value = cache.get(key)

        if not cached_fire_value:
            fire_values = FireValue(
                satellite_tag=satellite_tag, date=date, time=time, resolution=resolution
            ).get_fire_values()
            cached_fire_value = FireValueSchema(many=True).dump(fire_values)

            if datetime.utcnow().date() - timedelta(days=10) < date and cached_fire_value:
                cache.set(key, cached_fire_value, 24 * 60 * 60)

        return cached_fire_value
