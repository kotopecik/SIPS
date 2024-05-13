import glob
import pathlib
import re
import subprocess
import os
import shutil
import datetime
from typing import List

import appdp.conf as conf
from appdp.db.models import FireValueModel, DateTimeModel, SatelliteModel, CompositeModel, FileCompositeModel
from appdp.db.requests import DataBase

regex_satellite_datetime_fire_value = r"_([a-zA-Z\d]+)_d(\d{8})_t(\d{4})"
pattern_satellite_datetime_fire_value = re.compile(regex_satellite_datetime_fire_value)

regex_composite = r"viirs_([a-z\d]+)_"
pattern_composite = re.compile(regex_composite)

regex_path_output = r"(\/mnt\/ifs-gis\/production\/SNPP\/NPP_SOFT\/OUTDATA\/[\w-]+)\/"
pattern_path_output = re.compile(regex_path_output)


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


def load_fire_values_to_db(db, src, datetime_id, satellite_id):
    # Fire value
    fire_values: List[dict] = []

    filename_750m = glob.glob(f"{src}/FL*.txt")[0]
    # 375m fire values
    filename_375m = glob.glob(f"{src}/VF375*.txt")[0]

    print("dir_name", src)
    print("filename_375m", filename_375m)
    print("filename_750m", filename_750m)

    for index, filename in enumerate([filename_375m, filename_750m]):

        # Open file with fire points
        with open(filename, 'r') as f:
            for line in f:
                tmp_line = line.rstrip('\n')
                latitude, longitude, temperature, *_ = tmp_line.split(',')
                fire_values.append({
                    "longitude": longitude,
                    "latitude": latitude,
                    "temperature": temperature,
                    "resolution": index + 1,
                    "datetime_id": datetime_id,
                    "satellite_id": satellite_id
                })

    print("Len fire value", len(fire_values))

    print("Insert fire values.")
    # Insert fire values to database
    db.bulk_insert(FireValueModel, fire_values)


def load_file_composites_to_db(db, src, composite, datetime_id, satellite_id):
    print("Form file_composite list")
    file_composites = []
    for path in glob.glob(f"{src}/*.tif"):
        path_tmp = path.rstrip('\n')
        dir_name, filename = os.path.split(path_tmp)

        # Fetch composite
        match = pattern_composite.search(filename)
        composite_name = match.group(1)

        file_composites.append({
            "filename": path_tmp,
            "datetime_id": datetime_id,
            "satellite_id": satellite_id,
            "composite_id": composite[composite_name],
            "datetime_created": datetime.datetime.now(),
            "access_tiles": True
        })

    print("Insert file_composites.")
    # Insert file_composite to database
    db.bulk_insert(FileCompositeModel, file_composites)


def load_composite(db):
    composites = [{"name": item} for item in unique_composites]
    output_composites = {}
    for item in composites:
        instance = db.get_or_create(CompositeModel, **item)
        output_composites.update({instance.name: instance.id})
    return composites


def make_dir(dst):
    pathlib.Path(dst).mkdir(parents=True, exist_ok=True)


def cp_by_glob(src, dst):
    if not os.path.isdir(dst):
        return
    make_dir(dst)

    for filename in glob.glob(src):
        shutil.copy(filename, dst)


def run_process_raw(input_raw_file) -> str:
    db = DataBase()

    # move to leapsec_dat dir
    print("Move to leapsec_dat dir")
    os.chdir(conf.LEAPSEC_DAT_PATH)

    print("Start algorithm service")
    result_algorithm = subprocess.run(
        ["sh", conf.STARTUP_ALGORITHM_SCRIPT_FILENAME, "-g", input_raw_file], capture_output=True
    )

    output_data_dir = pattern_path_output.search(result_algorithm.stdout).group()

    print("Start viewer service")
    result_viewer = subprocess.run(
        ["sh", conf.STARTUP_VIEWER_SCRIPT_FILENAME, output_data_dir], capture_output=True
    )

    # fetch date and time from filename
    satellite, date, time = pattern_satellite_datetime_fire_value.search(glob.glob(f"{output_data_dir}/FL*.txt")[0])
    # formatting date time
    datetime_fixation = format_date_time(" ".join([date, time]), "%Y%m%d %H%M")

    instance_datetime = db.get_or_create(DateTimeModel, **{"datetime": datetime_fixation})
    instance_satellite = db.get_or_create(SatelliteModel, **{"name": satellite, "tag": satellite})

    load_fire_values_to_db(db, output_data_dir, instance_datetime.id, instance_satellite.id)

    # make directory
    new_path_tiff_image = os.path.join(conf.PATH_TIFF_IMAGE, str(date), str(time))
    make_dir(new_path_tiff_image)

    # copy tif images
    print("Copy tif images")
    cp_by_glob(
        os.path.join(output_data_dir, "*.tif"),
        new_path_tiff_image
    )

    composites = load_composite(db)

    load_file_composites_to_db(db, new_path_tiff_image, composites, instance_datetime.id, instance_satellite.id)

    return output_data_dir
