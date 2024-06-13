from typing import List

from sqlalchemy import insert, func, delete

from ..db.base import db
from ..db import models as m


class FileDownloadDB:
    def get_by_uid(self, uid):
        instance = db.get_or_404(
            m.FileDownloadModel, uid, description="Composite (image for download) not found!"
        )
        return instance

    def load_urls_downloading(self, items: list):
        try:
            db.session.bulk_save_objects(items)
            db.session.commit()
        except:
            db.session.rollback()
            return False
        return True

    def get_count_files_to_download_by_user(self, user_id) -> int:
        count = db.session.execute(
            db.select(func.count(m.FileDownloadModel.user_id))
            .where(m.FileDownloadModel.user_id == user_id)
        ).scalar()
        return count

    def delete_all(self):
        db.session.execute(
            delete(m.FileDownloadModel)
        )
        db.session.commit()


class UserFileDownloadDB:
    def get_count_downloaded_files_by_user(self, user_id) -> int:
        count = db.session.execute(
            db.select(func.count(m.UserFileDownloadModel.user_id))
            .where(m.UserFileDownloadModel.user_id == user_id)
        ).scalar()
        return count

    def insert_user_file_download_obj(self, item: m.UserFileDownloadModel):
        db.session.add(item)
        db.session.commit()

    def delete_all(self):
        db.session.execute(
            delete(m.UserFileDownloadModel)
        )
        db.session.commit()


class FileCompositeDB:
    def get(self, images: list):
        condition = None
        for index, image in enumerate(images):
            tmp = (
                (m.CompositeModel.name == image.composite) &
                (m.SatelliteModel.tag == image.satellite) &
                (m.DateTimeModel.datetime == image.datetime)
            )
            condition = tmp if index == 0 else condition | tmp

        items = db.session.execute(
            db.select(
                m.FileCompositeModel, m.DateTimeModel, m.SatelliteModel, m.CompositeModel
            )
            .join(
                m.SatelliteModel,
                m.FileCompositeModel.satellite_id == m.SatelliteModel.id
            )
            .join(
                m.DateTimeModel,
                m.FileCompositeModel.datetime_id == m.DateTimeModel.id
            )
            .join(
                m.CompositeModel,
                m.FileCompositeModel.composite_id == m.CompositeModel.id
            )
            .where(condition)
            # .order_by(m.DateTimeModel.datetime, m.CompositeModel.name, m.SatelliteModel.tag)
        ).all()

        return items
