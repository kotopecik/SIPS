import datetime

from sqlalchemy import  Integer, String, DateTime
from sqlalchemy.orm import Mapped, mapped_column

from backend.Common.database.base import base


class FileComposite(base):
    __tablename__ = "file_composite"

    id: Mapped[int] = mapped_column(Integer, primary_key=True, unique=True)
    filename: Mapped[int] = mapped_column(String)
    datetime_id: Mapped[int] = mapped_column(Integer)
    composite_id: Mapped[int] = mapped_column(Integer)
    satellite_id: Mapped[int] = mapped_column(Integer)
    directory_save_id: Mapped[int] = mapped_column(Integer)
    datetime_created: Mapped[datetime.datetime] = mapped_column(DateTime(timezone=False))

