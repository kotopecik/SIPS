
import psycopg2.extensions
import psycopg2
import asyncio


from backend.Utils.database_setting import DataBaseSetting


class PostgresMonitorTable:
    __loop = None

    def __init__(self, table_name, db_setting: DataBaseSetting, callback=None):
        '''
        Description ...
        :params table_name:
        :params db_setting:
        :params callback:
        :return None:
        '''

        self._callback = callback

        self.__connection = psycopg2.connect(
            host=db_setting.host,
            port=db_setting.port,
            dbname=db_setting.dbname,
            user=db_setting.user,
            password=db_setting.password
        )
        self.__cursor = self.__connection.cursor()
        self.__cursor.execute(f'LISTEN {table_name}')
        self.__connection.set_isolation_level(psycopg2.extensions.ISOLATION_LEVEL_AUTOCOMMIT)

    @property
    def callback(self):
        return self._callback

    @callback.setter
    def callback(self, value):
        self._callback = value

    def handle(self):
        if not self._callback:
            raise Exception('callback is not None!')

        self._callback()

    def run(self):
        self.__loop = asyncio.get_event_loop()
        self.__loop.add_reader(self.__connection, self.handle)
        self.__loop.run_forever()
