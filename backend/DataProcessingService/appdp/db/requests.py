from sqlalchemy import select, insert

from appdp.db.base import SessionLocal, Base, engine
# from appdp.db.models import SatelliteModel, DateTimeModel
from appdp.db.models import *


class DataBase:

    def __init__(self):
        self.session = SessionLocal()

    def create_all(self):
        Base.metadata.create_all(engine)

    def drop_all(self):
        Base.metadata.drop_all(bind=engine, tables=[
            DateTimeModel.__table__,
            CompositeModel.__table__,
            SatelliteModel.__table__,
            FileCompositeModel.__table__,
            FireValueModel.__table__,
        ])

    def get_or_create(self, model, **kwargs):

        instance = self.session.query(model).filter_by(**kwargs).one_or_none()
        if instance:
            return instance
        else:
            instance = model(**kwargs)
            self.session.add(instance)
            self.session.commit()
            return instance

    def get_satellites(self) -> dict:
        query = select(SatelliteModel)
        satellites = self.session.scalars(query)

        return {
            item.tag: item.id for item in satellites
        }

    def insert_data(self, instance):
        self.session.add(instance)
        self.session.commit()
        return instance

    def bulk_insert(self, model, items: list):
        self.session.execute(insert(model), items)
        self.session.commit()

    def bulk_insert_scalars(self, model, items: list):
        output_items = self.session.scalars(insert(model).returning(model), items)
        self.session.commit()
        return output_items
