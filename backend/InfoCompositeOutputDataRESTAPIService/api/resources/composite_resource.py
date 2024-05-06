import pprint
from datetime import datetime, timedelta, date as d

from flask_restful_swagger_3 import Resource, swagger
from webargs import fields, validate
from webargs.flaskparser import use_args

from api.common.caching import cache
from api.common.composite import Composite
from api.swagger.schemas_sw import CompositeSchemaSwagger
from api.conf import REGEX_PARAMS_SATELLITE


class CompositeResource(Resource):
    @swagger.tags(['Composite'])
    @swagger.reorder_with(
        CompositeSchemaSwagger,
        as_list=True,
        description="Returns a composite list by date, satellite, time",
        summary="Get Composites"
    )
    @use_args({
        "satellite": fields.String(required=True, validate=validate.Regexp(REGEX_PARAMS_SATELLITE)),
        "date":      fields.Date(format="%Y-%m-%d", required=True),
        "time":      fields.Time(format="%H-%M", required=True),
    }, location="view_args")
    def get(self, *args, **kwargs):
        date = args[0]['date']
        satellite_tag = kwargs['satellite']
        time = args[0]['time']

        key = f"composite_{satellite_tag}_{date}_{time}"
        cached_composites = cache.get(key)

        if not cached_composites:
            composites = Composite(satellite_tag=satellite_tag, date=date, time=time).get_composites()
            composite_list = [item.name for item in composites]
            cached_composites = {"composites": composite_list}

            if datetime.utcnow().date() - timedelta(days=15) < date and composite_list:
                cache.set(key, cached_composites, 24 * 60 * 60)

        return cached_composites
