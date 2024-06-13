from sqlalchemy import Integer, String, DateTime, ForeignKey, Numeric, Boolean, SmallInteger
from sqlalchemy.orm import Mapped, mapped_column
from ..db.base import db


class DateTimeModel(db.Model):
    """
    Stores date and time of snapshot.
    """

    __tablename__ = "date_time"

    id: Mapped[int] = mapped_column(Integer, primary_key=True, unique=True)
    datetime: Mapped[DateTime] = mapped_column(DateTime(timezone=False), unique=True)


class CompositeModel(db.Model):
    """
    Stores the tags of composite.
    """

    __tablename__ = "composite"

    id: Mapped[int] = mapped_column(Integer, primary_key=True, unique=True)

    name: Mapped[str] = mapped_column(String(20))


class SatelliteModel(db.Model):
    """
    Stores the satellite name and tag.
    """

    __tablename__ = "satellite"

    id: Mapped[int] = mapped_column(Integer, primary_key=True, unique=True)

    name: Mapped[str] = mapped_column(String(30))
    tag: Mapped[str] = mapped_column(String(20))


class FileCompositeModel(db.Model):
    """
    Stores snapshots.
    """

    __tablename__ = "file_composite"

    id: Mapped[int] = mapped_column(Integer, primary_key=True, unique=True)

    filename: Mapped[str] = mapped_column(String)
    datetime_created: Mapped[DateTime] = mapped_column(DateTime(timezone=False))
    access_tiles: Mapped[bool] = mapped_column(Boolean, default=False)

    datetime_id: Mapped[int] = mapped_column(Integer, ForeignKey(f'{DateTimeModel.__tablename__}.id'))
    composite_id: Mapped[int] = mapped_column(Integer, ForeignKey(f'{CompositeModel.__tablename__}.id'))
    satellite_id: Mapped[int] = mapped_column(Integer, ForeignKey(f'{SatelliteModel.__tablename__}.id'))


class FireValueModel(db.Model):  # cache
    """
    Stores fire value.
    """

    __tablename__ = "fire_value"

    id: Mapped[int] = mapped_column(Integer, primary_key=True, unique=True)

    temperature: Mapped[float] = mapped_column(Numeric(5, 2))
    longitude: Mapped[float] = mapped_column(Numeric(8, 5))
    latitude: Mapped[float] = mapped_column(Numeric(8, 5))
    resolution: Mapped[int] = mapped_column(SmallInteger, default=1)

    satellite_id: Mapped[int] = mapped_column(Integer, ForeignKey(f'{SatelliteModel.__tablename__}.id'))
    datetime_id: Mapped[int] = mapped_column(Integer, ForeignKey(f'{DateTimeModel.__tablename__}.id'))

    def __repr__(self):
        return f"<FireValue {self.id}>"

    RESOLUTION_SATELLITE = {
        "375m": 1,
        "750m": 2
    }


class FileDownloadModel(db.Model):
    __tablename__ = "file_download"

    uid: Mapped[str] = mapped_column(String, primary_key=True, unique=True)
    user_id: Mapped[int] = mapped_column(Integer)
    filename: Mapped[str] = mapped_column(String)
    datetime_created: Mapped[DateTime] = mapped_column(DateTime(timezone=False))

    def __repr__(self):
        return f"<FileDownload {self.uid}>"


class UserFileDownloadModel(db.Model):
    __tablename__ = "user_file_download"

    id: Mapped[int] = mapped_column(Integer, primary_key=True, unique=True)
    user_id: Mapped[int] = mapped_column(Integer)
    file_download_id: Mapped[str] = mapped_column(String, ForeignKey(f'{FileDownloadModel.__tablename__}.uid'))
    datetime_created: Mapped[DateTime] = mapped_column(DateTime(timezone=False))

    def __repr__(self):
        return f"<UserFileDownload {self.user_id} {self.file_download_id}>"
