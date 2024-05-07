from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker, declarative_base

from conf import SQLALCHEMY_DATABASE_URI, SQLALCHEMY_ECHO

engine = create_engine(
    SQLALCHEMY_DATABASE_URI,
    echo=SQLALCHEMY_ECHO
)

SessionLocal = sessionmaker(
    autocommit=False,
    autoflush=False,
    bind=engine
)

Base = declarative_base()
