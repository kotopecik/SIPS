from dataclasses import dataclass


@dataclass
class DataBaseSetting:
    host: str
    port: int
    dbname: str
    user: str
    password: str
