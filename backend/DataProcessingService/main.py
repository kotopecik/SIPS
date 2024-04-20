
from backend.Utils.postgres_monitor_table import PostgresMonitorTable
from backend.Utils.database_setting import PostgresDataBaseSetting
from backend.Common.database.requests import DBRequest


def test_fun(*args, **kwargs):
    print(args)
    print(kwargs)
    print('Callback function')


if __name__ == "__main__":
    # engine_base = EngineBaseSqlAlchemy("postgresql://user_db:1234@127.0.0.1:5434/test_db")
    # db_request = DBRequest(session_local(), engine)
    # db_request.create_function_to_monitor_directory()
    # db_request.create_trigger_to_monitor()
    # db_request.get_table_names()
    # db_request.create_tables()
    # db_request.get_table_names()
    # # db_request.drop_table()

    #####

    # Input data:
    #   archive(unpack) -> raw, h5, dir (SVIn, SVMn, GITCO, GTMCO),
    #   raw(alg unpack) -> (SVIn, SVMn, GITCO, GTMCO),
    #   h5(alg unpack) -> (SVIn, SVMn, GITCO, GTMCO),
    #   directory(copy and alg process) -> (SVIn, SVMn1, GITCO, GTMCO).

    #####

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
