from __future__ import annotations

import glob
import pathlib
import subprocess
import os
import shutil
import datetime
from typing import List

import appdp.conf as conf
from appdp.db.models import FireValueModel, DateTimeModel, SatelliteModel, CompositeModel, FileCompositeModel
from appdp.db.requests import DataBase
from appdp.utils.regex_patterns import *


unique_composites = [
    "aot550", "aotaps", "clmsk", "clmsk2", "clphs",
    "frmsk", "vievi", "vindvi", "vlst", "vscmo",
]


def format_date_time(date_time: str, template: str):
    """
    The function perform converting to some template
    :params date_time: store datetime
    :params template: the template to convert the date and time to
    """

    datetime_fixed = datetime.datetime.strptime(
        f"{date_time}",
        f"{template}"
    )
    return datetime_fixed


def load_fire_values_to_db(db, src, datetime_id, satellite_id):
    """
    The functions perform loading the data about fire_values to database
    :params db: object of the access class to database
    :params src:
    :params datetime_id: datetime_id store the id that get from database
    :params satellite_id: satellite_id store the id that get from database
    :return None:
    """

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


def load_file_composites_to_db(db: DataBase, tiff_images: list, composites: dict, datetime_id: int, satellite_id: int):
    """
    The function perform loading the data of the tiff images to database
    :params db: object of the access class to database
    :params tiff_directory: directory used for store the tiff image
    :params composites: stores composites in the format {'name': id}
    :params datetime_id: datetime_id store the id that get from database
    :params satellite_id: satellite_id store the id that get from database
    """

    print("Form file_composite list")
    file_composites = []
    for tiff_image in tiff_images:
        path_tmp = tiff_image.rstrip('\n')
        dir_name, filename = os.path.split(path_tmp)

        # Fetch composite
        match = pattern_composite.search(filename)
        composite_name = match.group(1)

        file_composites.append({
            "filename": path_tmp,
            "datetime_id": datetime_id,
            "satellite_id": satellite_id,
            "composite_id": composites[composite_name],
            "datetime_created": datetime.datetime.now(),
            "access_tiles": True
        })

    print("Insert file_composites.")
    # Insert file_composite to database
    db.bulk_insert(FileCompositeModel, file_composites)


def load_composite(db) -> dict:
    """
    The function loads or gets  composites to database
    :params db: object of the access class to database
    :return dict:
    """

    composites = [{"name": item} for item in unique_composites]
    output_composites = {}
    for item in composites:
        instance = db.get_or_create(CompositeModel, **item)
        output_composites.update({instance.name: instance.id})
    return output_composites


def make_dir(dst):
    pathlib.Path(dst).mkdir(parents=True, exist_ok=True)


def cp_by_glob(src_directory_template, dst_directory):
    """
    Copy files source to destination
    :params src_directory_template: source dir store files with template
    :params dst_directory: destination dir used to save the files
    :return None:
    """

    if not os.path.isdir(dst_directory):
        return
    make_dir(dst_directory)

    for filename in glob.glob(src_directory_template):
        shutil.copy(filename, dst_directory)


def show_files(directory: str) -> None:
    for _, _, files in os.walk(directory):
        for file in files:
            print(file)


def process_raw(input_raw_file, *options) -> str | None:
    """
    Process RAW file
    :params input_raw_file: store full path to RAW file
    :params options: some options to run algorithms
    :return str:
    """

    db = DataBase()

    # move to leapsec_dat dir
    print(f"Move to leapsec_dat dir: {conf.LEAPSEC_DAT_PATH}")
    os.chdir(conf.LEAPSEC_DAT_PATH)

    print("Start algorithm service...")
    tmp_options = list(*options)
    options = tmp_options if tmp_options else ["-g", ]

    # run algorithms
    result_algorithm = subprocess.run(
        ["sh", conf.STARTUP_ALGORITHM_SCRIPT_FILENAME, *options, input_raw_file], capture_output=True
    )
    print(result_algorithm.stdout)
    match = pattern_path_output.search(str(result_algorithm.stdout))
    print(match)
    if match:
        output_data_dir = match.group()
    else:
        return None

    print("Start viewer service...")

    # run visualization service (convert from .h5 to .tiff)
    result_viewer = subprocess.run(
        ["sh", conf.STARTUP_VIEWER_SCRIPT_FILENAME, output_data_dir], capture_output=True
    )
    print(result_viewer.args)

    # fetch date and time from filename
    match = pattern_satellite_datetime_fire_value.search(glob.glob(f"{output_data_dir}/FL*.txt")[0])

    if match:
        satellite, date, time = match.groups()
    else:
        return None

    # formatting date time
    datetime_fixation = format_date_time(" ".join([date, time]), "%Y%m%d %H%M")

    # get/create to/from db datetime, satellite
    instance_datetime = db.get_or_create(DateTimeModel, **{"datetime": datetime_fixation})
    instance_satellite = db.get_or_create(SatelliteModel, **{"name": satellite, "tag": satellite})

    # insert fire_values
    load_fire_values_to_db(db, output_data_dir, instance_datetime.id, instance_satellite.id)

    # make directory
    new_path_tiff_image = os.path.join(conf.PATH_TIFF_IMAGE, str(date), str(time))
    make_dir(new_path_tiff_image)

    # copy tif images to directory save
    print("Copy tif images")
    cp_by_glob(
        os.path.join(output_data_dir, "*.tif"),
        new_path_tiff_image
    )
    show_files(new_path_tiff_image)

    # get/create composites to db
    composites = load_composite(db)

    # insert info about stored tiff images
    tiff_images = glob.glob(f"{new_path_tiff_image}/*.tif")
    load_file_composites_to_db(db, tiff_images, composites, instance_datetime.id, instance_satellite.id)

    return output_data_dir


if __name__ == '__main__':
    db = DataBase()
    db.create_all()

    try:
        process_raw('', ())
    except Exception as e:
        print(e)

    db.drop_all()
