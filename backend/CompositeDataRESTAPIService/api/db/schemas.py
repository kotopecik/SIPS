from marshmallow_sqlalchemy import SQLAlchemyAutoSchema

from api.db.models import SatelliteModel


class SatelliteSchema(SQLAlchemyAutoSchema):
    class Meta:
        model = SatelliteModel
        include_relationship = True
        load_instance = True
