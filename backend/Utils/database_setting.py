from dataclasses import dataclass


@dataclass
class DataBaseSetting:
    host: str
    port: int
    dbname: str
    user: str
    password: str

    def get_raw_connection(self):
        pass


class PostgresDataBaseSetting(DataBaseSetting):
    def get_raw_connection(self) -> str:
        return f'postgresql://{self.user}:{self.password}@{self.host}:{self.port}/{self.dbname}'
