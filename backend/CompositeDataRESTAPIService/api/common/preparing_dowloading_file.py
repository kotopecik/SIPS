import uuid
from dataclasses import dataclass
import datetime
from typing import List

from api import conf
from api.db.models import FileDownloadModel


@dataclass
class CuttingPoint:
    id: int
    longitude: float
    latitude: float


@dataclass
class CompositeImage:
    datetime: datetime.datetime
    satellite: str
    composite: str
    filename: str = None
    url: str = None
    preview: str = None
    uid: str = None


@dataclass
class CompositePreparing:
    images: List[CompositeImage]
    points: List[CuttingPoint] = None


class CuttingSubCompositeImage(CompositeImage):
    def cut(self, points: List[CuttingPoint]):
        pass


class PreviewingCompositeImage(CompositeImage):
    def make(self, is_cutting_image: bool):
        pass


def form_file_download_obj_to_db(images: List[CompositeImage], user_id: int):
    items = []
    for image in images:
        uuid_url = uuid.uuid4().hex[:8]
        items.append(FileDownloadModel(
            uid=uuid_url,
            user_id=user_id,
            filename=image.filename,
            datetime_created=datetime.datetime.utcnow()
        ))
        image.url = f"{conf.URL_FILE_DOWNLOAD}/{uuid_url}"
        image.uid = uuid_url

    return items


