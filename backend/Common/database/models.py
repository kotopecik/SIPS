import datetime

from sqlalchemy import Integer, String, DateTime, ForeignKey
from sqlalchemy.orm import Mapped, mapped_column

from backend.Common.database.base import base


class DateTimeModel(base):
    __tablename__ = "date_time"

    id: Mapped[int] = mapped_column(Integer, primary_key=True, unique=True)
    datetime: Mapped[datetime.datetime] = mapped_column(DateTime(timezone=False), unique=True)


class CompositeModel(base):
    __tablename__ = "composite"

    id: Mapped[int] = mapped_column(Integer, primary_key=True, unique=True)
    name: Mapped[str] = mapped_column(String)


class DirectoryModel(base):
    __tablename__ = "directory"

    id: Mapped[int] = mapped_column(Integer, primary_key=True, unique=True)
    name: Mapped[str] = mapped_column(String)


class SatelliteModel(base):
    __tablename__ = "satellite"

    id: Mapped[int] = mapped_column(Integer, primary_key=True, unique=True)
    name: Mapped[str] = mapped_column(String)
    tag: Mapped[str] = mapped_column(String)


class FileCompositeModel(base):
    __tablename__ = "file_composite"

    id: Mapped[int] = mapped_column(Integer, primary_key=True, unique=True)
    filename: Mapped[str] = mapped_column(String)
    level: Mapped[int] = mapped_column(Integer) # level: 0, 1, 2, 3, 4
    datetime_id: Mapped[int] = mapped_column(Integer, ForeignKey(f'{DateTimeModel.__tablename__}.id'))
    composite_id: Mapped[int] = mapped_column(Integer, ForeignKey(f'{CompositeModel.__tablename__}.id'))
    satellite_id: Mapped[int] = mapped_column(Integer, ForeignKey(f'{SatelliteModel.__tablename__}.id'))
    directory_save_id: Mapped[int] = mapped_column(Integer, ForeignKey(f'{DirectoryModel.__tablename__}.id'))
    datetime_created: Mapped[datetime.datetime] = mapped_column(DateTime(timezone=False))
