# from flask_restful import Resource
from flask_restful_swagger_3 import swagger, Resource

from api.common.satellite import get_satellites, get_satellite_by_id
from api.db.schemas import SatelliteSchema
from api.swagger.schemas_sw import SatelliteSchemaSwagger
from api.common.caching import cache


class SatelliteResource(Resource):
    @swagger.tags(['Satellite'])
    @swagger.reorder_with(
        SatelliteSchemaSwagger,
        description="Returns a satellite by id",
        summary="Get Satellite"
    )
    def get(self, id):
        satellite = get_satellite_by_id(id)
        serialized = SatelliteSchema().dump(satellite)

        return serialized


class SatelliteListResource(Resource):
    @swagger.tags(['Satellite'])
    @swagger.reorder_with(
        SatelliteSchemaSwagger,
        as_list=True,
        description="Returns a satellites",
        summary="Get Satellites"
    )
    def get(self):
        cached_satellites = cache.get("satellites")
        if not cached_satellites:
            satellites = get_satellites()
            cached_satellites = SatelliteSchema(many=True).dump(satellites)
            cache.set("satellites", cached_satellites, 48 * 60 * 60)

        return cached_satellites
