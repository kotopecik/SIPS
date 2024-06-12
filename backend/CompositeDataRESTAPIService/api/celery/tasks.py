import datetime
import logging

from celery import shared_task
from sqlalchemy.orm import Session

from ..db.requests import FileDownloadDB, UserFileDownloadDB
from .. import conf


@shared_task()
def clear_download_files():
    datetime_current = datetime.datetime.utcnow().strftime("%H:%M")
    logging.debug(datetime_current)
    if datetime_current == conf.CLEAR_FILE_DOWNLOAD_TIME:
        logging.debug('condition task')
        with Session() as session:
            logging.debug('context task')
            with session.begin():
                logging.debug('inner task')
                UserFileDownloadDB().delete_all()
                FileDownloadDB().delete_all()
                logging.debug('performed conditions of the tasks')
