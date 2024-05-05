from flask_restful import Resource

from api.db.base import db
from api.db.models import SatelliteModel
from api.db.schemas import SatelliteSchema


class SatelliteResource(Resource):
    def get(self):
        satellites = db.session.execute(db.select(SatelliteModel)).scalars()
        serialized = SatelliteSchema(many=True).dump(satellites)

        return {"satellites": serialized, "code": 200}
