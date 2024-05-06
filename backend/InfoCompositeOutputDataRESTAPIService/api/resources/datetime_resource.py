from flask_restful_swagger_3 import Resource, swagger
from webargs import fields
from webargs.flaskparser import use_args

from api.common.date_time import DateService, DateTime
from api.swagger.schemas_sw import DateTimeSchemaSwagger, DateSchemaSwagger
from api.common.caching import cache


class DateResource(Resource):

    @swagger.tags(['DateTime'])
    @swagger.reorder_with(
        DateSchemaSwagger,
        description="Returns a date",
        summary="Get Date"
    )
    def get(self):
        date_s = DateService()

        cached_dates = cache.get("dates")
        if not cached_dates:
            items = date_s.get_dates()
            cached_dates = date_s.format_dates(items)
            cache.set("dates", cached_dates, 12 * 60 * 60)

        return cached_dates


class DateTimeResource(Resource):

    @swagger.tags(['DateTime'])
    @swagger.reorder_with(
        DateTimeSchemaSwagger,
        description="Returns a time by date",
        summary="Get Times"
    )
    @use_args({
        "date": fields.Date(format="%Y-%m-%d", required=True),
    }, location="view_args")
    def get(self, *args, **kwargs):
        date = kwargs.get('date')

        date_time = DateTime(date=date)
        datetime_items = date_time.get_datetimes()
        formatted_times = date_time.fetch_times(datetime_items)

        return {'times': formatted_times}
