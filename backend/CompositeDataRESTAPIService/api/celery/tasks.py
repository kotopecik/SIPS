import datetime
import logging

from celery import shared_task
from sqlalchemy.orm import Session

from ..db.requests import FileDownloadDB, UserFileDownloadDB
from .. import conf


clear_datetime_tmp = datetime.datetime.strptime(conf.CLEAR_FILE_DOWNLOAD_TIME, "%H:%M")
periodic_check_time_tmp = datetime.timedelta(seconds=conf.CLEAR_FILE_DOWNLOAD_TIME_SCHEDULE)
datetime_tmp = clear_datetime_tmp + periodic_check_time_tmp
datetime_tmp = datetime_tmp.strftime("%H:%M")


@shared_task()
def clear_download_files():
    datetime_current = datetime.datetime.utcnow().strftime("%H:%M")
    logging.debug(datetime_current)
    if datetime_tmp >= datetime_current:
        logging.debug('condition task')
        with Session() as session:
            logging.debug('context task')
            with session.begin():
                logging.debug('inner task')
                UserFileDownloadDB().delete_all()
                FileDownloadDB().delete_all()
                logging.debug('performed conditions of the tasks')
