from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker, declarative_base


class EngineBaseSqlAlchemy:
    def __init__(self, url_db):
        """
        Initializing the database engine component
        :params url_db: The url row is used to access to database
        :return None:
        """

        self.engine = create_engine(url_db)
        self.session_local = sessionmaker(
            autocommit=False,
            autoflush=False,
            bind=self.engine
        )
        self.base = declarative_base()
