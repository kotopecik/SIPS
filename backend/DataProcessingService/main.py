from backend.Common.database.base import session_local, engine
from backend.Utils.postgres_monitor_table import PostgresMonitorTable
from backend.Utils.database_setting import PostgresDataBaseSetting
from backend.Common.database.requests import DBRequest


def test_fun():
    print('Callback function')


if __name__ == "__main__":
    # db_request = DBRequest(session_local(), engine)
    # db_request.create_function_to_monitor_directory()
    # db_request.create_trigger_to_monitor()
    # db_request.get_table_names()
    # db_request.create_tables()
    # db_request.get_table_names()
    # # db_request.drop_table()

    pmt = PostgresMonitorTable(
        "directory1",
        PostgresDataBaseSetting(
            host="127.0.0.1",
            port=5434,
            dbname="test_db",
            user="user_db",
            password="1234"
        )
    )
    pmt.callback = test_fun
    pmt.run()
