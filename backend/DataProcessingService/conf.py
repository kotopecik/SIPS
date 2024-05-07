
from dotenv import load_dotenv, find_dotenv
import os

load_dotenv(dotenv_path=find_dotenv('.env'))

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

SQLALCHEMY_ECHO = False
