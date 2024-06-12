import glob
import os
import re
import datetime
from typing import List

from appdp.db.models import DateTimeModel, CompositeModel, FileCompositeModel, FireValueModel, SatelliteModel
from appdp.db.requests import DataBase

# Paths to files
path_save_processed_data = "/home/grigoriy/tiles/SNPP/NPP_SOFT/OUTDATA"
path_to_file_tif = "/home/grigoriy/ict-psk/paths-to-tiff.txt"


# re pattern compile
regex_composite = r"viirs_([a-z\d]+)_"
pattern_composite = re.compile(regex_composite)

regex_datetime_fire_value = r"d(\d{8})_t(\d{4})"
pattern_datetime_fire_value = re.compile(regex_datetime_fire_value)


unique_composites = [
    "aot550", "aotaps", "clmsk", "clmsk2", "clphs",
    "frmsk", "vievi", "vindvi", "vlst", "vscmo",
]


def format_date_time(date_time: str, format: str):
    datetime_fixed = datetime.datetime.strptime(
        f"{date_time}",
        f"{format}"
    )
    return datetime_fixed


def main(db):

    unique_date_times = set()
    file_composites: List[dict] = []

    # Open file with path to composite
    with open(path_to_file_tif, 'r') as f:
        for path in f:
            path_tmp = path.rstrip('\n')
            dir_name, filename = os.path.split(path_tmp)

            # Fetch composite
            match = pattern_composite.search(filename)
            composite_name = match.group(1)

            # Fetch satellite, date, time from path
            split_dir_name = dir_name.split('/')
            satellite, date, time = split_dir_name[-3:]

            datetime_fixed = format_date_time(f"{date} {time}", "%Y%m%d %H%M")
            unique_date_times.add(datetime_fixed)

            file_composites.append({
                "filename": path_tmp,
                "datetime_id": datetime_fixed,
                "satellite_id": satellite,
                "composite_id": composite_name,
                "datetime_created": datetime.datetime.now(),
                "access_tiles": True
            })

    # Insert satellites
    output_satellites = {
        item.tag: item.id
        for item in db.bulk_insert_scalars(SatelliteModel, [
            {
                "name": "Soumi NPP",
                "tag": "snpp"
            },
            {
                "name": "NOAA-20",
                "tag": "noaa20"
            }
        ])
    }

    print("Insert datetimes, composites.")

    # Insert datetimes of fixation to database
    date_times = [{"datetime": item} for item in unique_date_times]
    output_date_times = {
        item.datetime: item.id
        for item in db.bulk_insert_scalars(DateTimeModel, date_times)
    }

    # Insert composites to database
    composites = [{"name": item} for item in unique_composites]
    output_composites = {
        item.name: item.id
        for item in db.bulk_insert_scalars(CompositeModel, composites)
    }

    # Change values by indexes into file_composites
    for i in range(len(file_composites)):
        file_composites[i]["datetime_id"] = output_date_times[file_composites[i]["datetime_id"]]
        file_composites[i]["composite_id"] = output_composites[file_composites[i]["composite_id"]]
        file_composites[i]["satellite_id"] = output_satellites[file_composites[i]["satellite_id"]]

    print("Insert file_composites.")

    # Insert file_composite to database
    db.bulk_insert(FileCompositeModel, file_composites)

    # Fire value
    fire_values: List[dict] = []

    for dir_name in glob.glob(f"{path_save_processed_data}/NPP*"):

        # 750m fire values
        filename_750m = glob.glob(f"{dir_name}/FL*.txt")[0]
        # 375m fire values
        filename_375m = glob.glob(f"{dir_name}/VF375*.txt")[0]

        print("dir_name", dir_name)
        print("filename_375m", filename_375m)
        print("filename_750m", filename_750m)

        for index, filename in enumerate([filename_375m, filename_750m]):

            # fetch date and time from filename
            fetched_datetime = pattern_datetime_fire_value.search(filename)

            # formatting date time
            date_time_fire_value = format_date_time(" ".join(fetched_datetime.groups()), "%Y%m%d %H%M")

            # Open file with fire points
            with open(filename, 'r') as f:
                for line in f:
                    tmp_line = line.rstrip('\n')
                    latitude, longitude, temperature, *_ = tmp_line.split(',')
                    fire_values.append({
                        "longitude": longitude,
                        "latitude": latitude,
                        "temperature": temperature,
                        "resolution": index+1,
                        "datetime_id": output_date_times[date_time_fire_value],
                        "satellite_id": output_satellites["snpp"]
                    })

    print("Len fire value", len(fire_values))

    # # Change values by indexes fire values
    # for i in range(len(fire_values)):
    #     fire_values[i]["datetime_id"] = output_date_times[fire_values[i]["datetime_id"]]

    print("Insert fire values.")
    # Insert fire values to database
    db.bulk_insert(FireValueModel, fire_values)


if __name__ == '__main__':
    db = DataBase()
    db.drop_all()
    db.create_all()
    main(db)

