
from dotenv import load_dotenv, find_dotenv
import os

load_dotenv(dotenv_path=find_dotenv('.env'))

# Database settings
POSTGRES_HOST = os.getenv("POSTGRES_HOST", '127.0.0.1')
POSTGRES_PORT = os.getenv("POSTGRES_PORT", 5434)
POSTGRES_DB = os.getenv("POSTGRES_DB", "composite_db")
POSTGRES_USER = os.getenv("POSTGRES_USER", "test")
POSTGRES_PASSWORD = os.getenv("POSTGRES_PASSWORD", "1234")

SQLALCHEMY_DATABASE_URI1 = (f"postgresql://{POSTGRES_USER}:"
                           f"{POSTGRES_PASSWORD}@{POSTGRES_HOST}"
                           f":{POSTGRES_PORT}/{POSTGRES_DB}")

SQLALCHEMY_DATABASE_URI = (f"postgresql://{POSTGRES_USER}:"
                           f"{POSTGRES_PASSWORD}@172.28.0.2"
                           f":5432/{POSTGRES_DB}")

SQLALCHEMY_DATABASE_URI = (f"postgresql://test:"
                           f"1234@172.17.0.4"
                           f":5432/composite_db")

SQLALCHEMY_ECHO = False

# Rabbitmq settings
RABBITMQ_HOST = os.getenv("RABBITMQ_HOST")
RABBITMQ_PORT = int(os.getenv("RABBITMQ_PORT"))
RABBITMQ_VIRTUALHOST = os.getenv("RABBITMQ_VIRTUALHOST")
RABBITMQ_USERNAME = os.getenv("RABBITMQ_USERNAME")
RABBITMQ_PASSWORD = os.getenv("RABBITMQ_PASSWORD")


LEAPSEC_DAT_PATH = os.getenv("LEAPSEC_DAT_PATH")
STARTUP_ALGORITHM_SCRIPT_FILENAME = os.getenv("STARTUP_ALGORITHM_SCRIPT_FILENAME")
STARTUP_VIEWER_SCRIPT_FILENAME = os.getenv("STARTUP_VIEWER_SCRIPT_FILENAME")

PATH_TIFF_IMAGE = os.getenv("PATH_TIFF_IMAGE")
