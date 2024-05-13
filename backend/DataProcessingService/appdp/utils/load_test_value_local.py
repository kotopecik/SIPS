import os
import datetime
import pprint
import re

from appdp.db.models import DateTimeModel, CompositeModel, FileCompositeModel, FireValueModel
from appdp.db.requests import DataBase

path_to_file = "/home/grigoriy/ict-psk/paths-to-tiff.txt"
path_to_file_fire_value = "/home/grigoriy/ict-psk/FL_npp_d20230617_t0720369_e0731589_b60296_c2024.txt"
path_to_file_fire_value_1 = "/home/grigoriy/ict-psk/VF375_npp_d20230617_t0720369_e0731589_b60296_c2024.txt"

regex = r"viirs_([a-z\d]+)_"
pattern = re.compile(regex)

regex_datetime = r"d(\d{8})_t(\d{4})"
pattern_datetime = re.compile(regex_datetime)


def format_date_time(date_time: str, format: str):
    datetime_fixed = datetime.datetime.strptime(
        f"{date_time}",
        f"{format}"
    )
    return datetime_fixed


def read_fire_values():
    fire_values = []
    for index, filename in enumerate([path_to_file_fire_value_1, path_to_file_fire_value]):
        fetched_datetime = pattern_datetime.search(filename)
        date_time = format_date_time(" ".join(fetched_datetime.groups()), "%Y%m%d %H%M")

        with open(filename, 'r') as f:
            for line in f:
                tmp_line = line.rstrip('\n')
                latitude, longitude, temperature, *_ = tmp_line.split(',')
                fire_values.append({
                    "longitude": longitude,
                    "latitude": latitude,
                    "temperature": temperature,
                    "resolution": index+1,
                    "datetime_id": date_time,
                    "satellite_id": 1
                })

    return fire_values


def main():
    db = DataBase()
    # output_satellites = db.get_satellites()

    # pprint.pprint(satellites)

    unique_date_times = set()
    unique_satellites = set()
    file_composites = []
    unique_composites = [
        "aot550", "aotaps", "clmsk", "clmsk2", "clphs",
        "frmsk", "vievi", "vindvi", "vlst", "vscmo",
    ]

    with open(path_to_file, 'r') as f:
        for path in f:
            path_tmp = path.rstrip('\n')
            dir_name, filename = os.path.split(path_tmp)

            match = pattern.search(filename)
            composite_name = match.group(1)

            split_dir_name = dir_name.split('/')
            satellite, date, time = split_dir_name[-3:]

            unique_satellites.add(satellite)

            datetime_fixed = format_date_time(f"{date} {time}", "%Y%m%d %H%M")
            unique_date_times.add(datetime_fixed)
            file_composites.append({
                "filename": path_tmp,
                "datetime_id": datetime_fixed,
                "satellite_id": 1,
                "composite_id": composite_name,
                "datetime_created": datetime.datetime.now(),
                "access_tiles": True
            })

    date_times = [{"datetime": item} for item in unique_date_times]
    output_date_times = {}
    for item in date_times:
        instance = db.get_or_create(DateTimeModel, **item)
        output_date_times.update({instance.datetime: instance.id})

    if 0:
        output_date_times = {
            item.datetime: item.id
            for item in db.bulk_insert_scalars(DateTimeModel, date_times)
        }

    composites = [{"name": item} for item in unique_composites]
    output_composites = {}
    for item in composites:
        instance = db.get_or_create(CompositeModel, **item)
        output_composites.update({instance.name: instance.id})

    if 0:
        output_composites = {
            item.name: item.id
            for item in db.bulk_insert_scalars(CompositeModel, composites)
        }

    for i in range(len(file_composites)):
        file_composites[i]["datetime_id"] = output_date_times[file_composites[i]["datetime_id"]]
        file_composites[i]["composite_id"] = output_composites[file_composites[i]["composite_id"]]

    # pprint.pprint(file_composites)
    #
    #db.bulk_insert(FileCompositeModel, file_composites)

    fire_values = read_fire_values()
    for i in range(len(fire_values)):
        fire_values[i]["datetime_id"] = output_date_times[fire_values[i]["datetime_id"]]

    db.bulk_insert(FireValueModel, fire_values)


if __name__ == '__main__':
    main()
