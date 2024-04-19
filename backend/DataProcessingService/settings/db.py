from dotenv import load_dotenv, find_dotenv
import os

from backend.Utils.database_setting import PostgresDataBaseSetting

load_dotenv()


postgres_db_setting = PostgresDataBaseSetting(
    host=os.getenv('POSTGRES_HOST'),
    port=int(os.getenv('POSTGRES_PORT')),
    user=os.getenv('POSTGRES_USER'),
    password=os.getenv('POSTGRES_PASSWORD'),
    dbname=os.getenv('POSTGRES_DB'),
)
