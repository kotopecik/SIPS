
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker, declarative_base


engine = create_engine(
   "postgresql://user_db:1234@127.0.0.1:5434/test_db"
)
session_local = sessionmaker(
   autocommit=False,
   autoflush=False,
   bind=engine
)
base = declarative_base()
