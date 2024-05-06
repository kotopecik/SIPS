import os
import datetime
import pprint
import re

from db.models import DateTimeModel, CompositeModel, FileCompositeModel
from db.requests import DataBase

path_to_file = "/home/grig/paths-to-tiff.txt"

regex = r"viirs_([a-z\d]+)_"
pattern = re.compile(regex)


def main():
    db = DataBase()
    output_satellites = db.get_satellites()

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

            datetime_fixed = datetime.datetime.strptime(
                f"{date} {time}",
                "%Y%m%d %H%M"
            )
            unique_date_times.add(datetime_fixed)
            file_composites.append({
                "filename": path_tmp,
                "datetime_id": datetime_fixed,
                "satellite_id": 1,
                "composite_id": composite_name,
                "datetime_created": datetime.datetime.now()
            })

    date_times = [{"datetime": item} for item in unique_date_times]
    output_date_times = {
        item.datetime: item.id
        for item in db.bulk_insert_scalars(DateTimeModel, date_times)
    }

    composites = [{"name": item} for item in unique_composites]
    output_composites = {
        item.name: item.id
        for item in db.bulk_insert_scalars(CompositeModel, composites)
    }

    for i in range(len(file_composites)):
        file_composites[i]["datetime_id"] = output_date_times[file_composites[i]["datetime_id"]]
        file_composites[i]["composite_id"] = output_composites[file_composites[i]["composite_id"]]

    db.bulk_insert(FileCompositeModel, file_composites)


if __name__ == '__main__':
    main()
