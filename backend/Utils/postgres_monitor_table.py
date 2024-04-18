import logging
import pprint

import psycopg2.extensions
import psycopg2
import asyncio


from backend.Utils.database_setting import DataBaseSetting


""" for monitor table :

create or replace function <trigger name>() returns trigger
as $log$
declare
    event json;
BEGIN

    if (lower(tg_op) = 'insert') then
        event = json_build_object('id', new.id, 'longitude', new.longitude, 'latitude', new.latitude)::varchar;
    end if;

    perform pg_notify('<table name>', event::text);

    return NULL;
END;
$log$
language plpgsql;

"""


class PostgresMonitorTable:
    __loop = None

    def __init__(self, channel, db_setting: DataBaseSetting, callback=None):
        """
        Description ...
        :params table_name:
        :params db_setting:
        :params callback:
        :return None:
        """

        self._callback = callback

        self.__connection = psycopg2.connect(
            host=db_setting.host,
            port=db_setting.port,
            dbname=db_setting.dbname,
            user=db_setting.user,
            password=db_setting.password
        )
        self.__cursor = self.__connection.cursor()
        self.__connection.set_isolation_level(psycopg2.extensions.ISOLATION_LEVEL_AUTOCOMMIT)
        self.__cursor.execute(f"LISTEN {channel};")

    @property
    def callback(self):
        return self._callback

    @callback.setter
    def callback(self, value):
        self._callback = value

    def handle(self):
        if not self._callback:
            raise Exception("callback is not None!")
        logging.log(logging.INFO, 'Handle start')
        try:
            self.__connection.poll()
            for notify in self.__connection.notifies:
                print(notify)
                self._callback()
            self.__connection.notifies.clear()
        except psycopg2.OperationalError:
            self.__loop.stop()

    def run(self):
        """
        Description ...
        :params self:
        :return None:
        """

        self.__loop = asyncio.get_event_loop()
        self.__loop.add_reader(self.__connection, self.handle)
        self.__loop.run_forever()
