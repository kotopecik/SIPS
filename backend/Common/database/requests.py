import pprint

from sqlalchemy import inspect, text

from backend.Common.database.models import *
from backend.Utils.db_engine import EngineBaseSqlAlchemy


class DBRequest:
    def __init__(self, engine_base: EngineBaseSqlAlchemy):
        self.session = engine_base.session_local
        self.engine = engine_base.engine
        self.base = engine_base.base

    def get_table_names(self):
        table_names = inspect(self.engine).get_table_names()
        # pprint.pprint(inspect(self.engine).get_table_options('file_composite'))
        # pprint.pprint(dir(inspect(self.engine)))
        print(table_names)

    def create_tables(self):
        # if not (FileCompositeModel.__tablename__ in )
        self.base.metadata.create_all(self.engine)
        # base.metadata

    def drop_table(self):
        self.base.metadata.drop_all(self.engine)

    def create_function_to_monitor(self):
        function = """
        create or replace function __function_file_composite_notify__() returns trigger
        as $log$
        declare
            event json;
        BEGIN
        
            if (lower(tg_op) = 'insert') then
                event = json_build_object('id', new.id, 'longitude', new.longitude, 'latitude', new.latitude)::varchar;
            end if;
        
            perform pg_notify('file_composite', event::text);
        
            return NULL;
        END;
        $log$
        language plpgsql;
        """

        self.session.execute(
            text(function)
        )
        self.session.commit()

    def create_function_to_monitor_directory(self):
        function = """
        create or replace function __function_directory_notify__() returns trigger
        as $log$
        declare
            event json;
        BEGIN

            if (lower(tg_op) = 'insert') then
                event = json_build_object('id', 1, 'text', 'text', 'header', 'data_header')::varchar;
            end if;

            perform pg_notify('directory1', event::text);

            return NULL;
        END;
        $log$
        language plpgsql;
        """  # directory1 = channel

        self.session.execute(
            text(function)
        )
        self.session.commit()

    def create_trigger_to_monitor(self):
        trigger = """
        create trigger __trigger_directory_notify__ after insert on directory for each row
            execute function __function_directory_notify__();
        """

        self.session.execute(
            text(trigger)
        )
        self.session.commit()
