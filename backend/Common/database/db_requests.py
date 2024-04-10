
from sqlalchemy import inspect

from backend.Common.database.base import session_local, base, engine
from backend.Common.database.models import FileComposite


class DBRequest:
    def __init__(self, session):
        self.session = session

    def get_table_names(self):
        table_names = inspect(engine).get_table_names()
        print(table_names)

    def create_tables(self):
        base.metadata.create_all(engine)


db_request = DBRequest(session_local())
db_request.get_table_names()
db_request.create_tables()
db_request.get_table_names()
