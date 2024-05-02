from sqlalchemy import Integer, String, DateTime, ForeignKey, Numeric
from sqlalchemy.orm import Mapped, mapped_column
from api.db.base import db


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

    name: Mapped[str] = mapped_column(String)


class DirectoryModel(db.Model):
    """
    Saves the path to directories that stores the files.
    Also table is monitored.
    """

    __tablename__ = "directory"

    id: Mapped[int] = mapped_column(Integer, primary_key=True, unique=True)

    name: Mapped[str] = mapped_column(String)


class SatelliteModel(db.Model):
    """
    Stores the satellite name and tag.
    Also table is monitored.
    """

    __tablename__ = "satellite"

    id: Mapped[int] = mapped_column(Integer, primary_key=True, unique=True)

    name: Mapped[str] = mapped_column(String)
    tag: Mapped[str] = mapped_column(String)


class FileCompositeModel(db.Model):
    """
    Stores snapshots.
    """

    __tablename__ = "file_composite"

    id: Mapped[int] = mapped_column(Integer, primary_key=True, unique=True)

    filename: Mapped[str] = mapped_column(String)
    level: Mapped[int] = mapped_column(Integer)  # level: 0, 1, 2, 3, 4
    datetime_created: Mapped[DateTime] = mapped_column(DateTime(timezone=False))
    type: Mapped[str] = mapped_column(String(length=1))  # type attr: f, d

    datetime_id: Mapped[int] = mapped_column(Integer, ForeignKey(f'{DateTimeModel.__tablename__}.id'))
    composite_id: Mapped[int] = mapped_column(Integer, ForeignKey(f'{CompositeModel.__tablename__}.id'))
    satellite_id: Mapped[int] = mapped_column(Integer, ForeignKey(f'{SatelliteModel.__tablename__}.id'))
    directory_save_id: Mapped[int] = mapped_column(Integer, ForeignKey(f'{DirectoryModel.__tablename__}.id'))


class FireValueModel(db.Model): # cache
    """
    Stores fire value.
    """

    __tablename__ = "fire_value"

    id: Mapped[int] = mapped_column(Integer, primary_key=True, unique=True)

    temperature: Mapped[float] = mapped_column(Numeric(5, 2))
    longitude: Mapped[float] = mapped_column(Numeric(8, 5))
    latitude: Mapped[float] = mapped_column(Numeric(8, 6))

    satellite_id: Mapped[int] = mapped_column(Integer, ForeignKey(f'{SatelliteModel.__tablename__}.id'))
    datetime_id: Mapped[int] = mapped_column(Integer, ForeignKey(f'{DateTimeModel.__tablename__}.id'))
