import logging
import pprint

import psycopg2.extensions
import psycopg2
import asyncio
import json

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
        Initializing access to the database and set the required settings of track
        :params channel: the name of the channel that is used to transmit the inserted data
        :params db_setting: the object of the class with params to access to the database
        :params callback: the function is called when inserting the data
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

    def handle(self) -> None:
        """
        Handle the monitored result from the database
        :params self:
        :return None:
        """

        if not self._callback:
            raise Exception("callback is not None!")

        try:
            self.__connection.poll()
            for notify in self.__connection.notifies:
                json_data = json.loads(notify.payload)
                self._callback(**json_data)
            self.__connection.notifies.clear()
        except psycopg2.OperationalError:
            self.__loop.stop()

    def run(self) -> None:
        """
        Start async event loop to monitoring self.__connection
        :params self:
        :return None:
        """

        self.__loop = asyncio.get_event_loop()
        self.__loop.add_reader(self.__connection, self.handle)
        self.__loop.run_forever()
