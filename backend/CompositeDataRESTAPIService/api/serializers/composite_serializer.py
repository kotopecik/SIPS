from marshmallow import Schema, fields, validates, ValidationError, post_load

from api import conf
from api.common.preparing_dowloading_file import CuttingPoint, CompositeImage, CompositePreparing


class CuttingPointSerializer(Schema):
    id = fields.Integer(required=True)
    longitude = fields.Decimal(required=True)
    latitude = fields.Decimal(required=True)

    @post_load
    def post_load_data(self, in_data, many, *args,**kwargs):
        return CuttingPoint(**in_data)


class CompositeImageSerializer(Schema):
    datetime = fields.DateTime(required=True)
    satellite = fields.String(required=True)
    composite = fields.String(required=True)
    url = fields.String(required=False, dump_only=True)
    uid = fields.String(required=False, dump_only=True)

    @post_load
    def post_load_data(self, in_data, many, *args,**kwargs):
        return CompositeImage(**in_data)


class CompositePreparingSerializer(Schema):
    points = fields.List(fields.Nested(CuttingPointSerializer()))
    images = fields.List(fields.Nested(CompositeImageSerializer()), required=True)

    @validates("images")
    def validate_images(self, value):
        if not (0 < len(value) < conf.COUNT_FILE_DOWNLOAD):
            raise ValidationError("The number of images are not in the range from 1 to 10")

    @validates("points")
    def validate_points(self, value):
        if len(value) < 3:
            raise ValidationError("The number of points must be more than 2")

    @post_load
    def post_load_data(self, in_data, many, *args,**kwargs):
        return CompositePreparing(**in_data)
