import logging
import os
from dotenv import load_dotenv, find_dotenv

load_dotenv(dotenv_path='.env')

# conf app
DEBUG = (bool(int(os.getenv("DEBUG", 1))))
SECRET_KEY = os.getenv('SECRET_KEY')

COUNT_FILE_DOWNLOAD = 10
EXPANSIONS_ARCHIVE = ["zip", "tar", "rar", "7z"]
# regular expression for only symbols a-z, A-Z, 0-9 limited to 20 symbols
REGEX_PARAMS_SATELLITE = r"^[a-zA-Z0-9]{0,20}$"
REGEX_PARAMS_URL = r"^[a-zA-Z0-9]{0,8}$"

SCHEMA = os.getenv("SCHEMA")
DOMAIN = os.getenv("DOMAIN")
if os.getenv("PORT"):
    PORT = "" if int(os.getenv("PORT")) in (80, 443) else f":{os.getenv('PORT')}"
else:
    PORT = 8080

URL_FILE_DOWNLOAD = f"{SCHEMA}://{DOMAIN}{PORT}/api/vCD/composites/download"

CLEAR_FILE_DOWNLOAD_TIME = "00:00"

# conf database
POSTGRES_HOST = os.getenv("POSTGRES_HOST", '127.0.0.1')
POSTGRES_PORT = os.getenv("POSTGRES_PORT", 5434)
POSTGRES_DB = os.getenv("POSTGRES_DB", "composite_db")
POSTGRES_USER = os.getenv("POSTGRES_USER", "test")
POSTGRES_PASSWORD = os.getenv("POSTGRES_PASSWORD", "1234")

SQLALCHEMY_DATABASE_URI = (f"postgresql://{POSTGRES_USER}:"
                           f"{POSTGRES_PASSWORD}@{POSTGRES_HOST}:{POSTGRES_PORT}/{POSTGRES_DB}")
SQLALCHEMY_ECHO = False

# conf caching
CACHE_DEFAULT_TIMEOUT = int(os.getenv("CACHE_DEFAULT_TIMEOUT", 250))
CACHE_TYPE = os.getenv("CACHE_TYPE", 'RedisCache')
CACHE_REDIS_URL = os.getenv("CACHE_REDIS_URL", "redis://localhost:6379/0")

# conf JSONWebToken
PROPAGATE_EXCEPTIONS = True
JWT_SECRET_KEY = SECRET_KEY
JWT_IDENTITY_CLAIM = "exp"
