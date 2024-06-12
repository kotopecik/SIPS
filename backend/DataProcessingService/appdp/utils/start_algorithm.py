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


def format_date_time(date_time: str, template: str) -> datetime.datetime:
    """
    The function perform converting to some template
    :params date_time: store datetime
    :params template: the template to convert the date and time to
    """

    datetime_fixed = datetime.datetime.strptime(f"{date_time}", f"{template}")
    return datetime_fixed


def update_fire_value(
        fire_values: List[dict], datetime_id: int, satellite_id: int, resolution_id: int
) -> None:
    """
    The functions perform updating fire_values by adding the datetime_id, satellite_id, resolution_id keys
    :params db: object of the access class to database
    :params source_directory: source directory that store output files after processing
    :params datetime_id: datetime_id store the id that get from database
    :params satellite_id: satellite_id store the id that get from database
    :return None:
    """

    for i in range(len(fire_values)):
        fire_values[i].update({
            "resolution": resolution_id + 1,
            "datetime_id": datetime_id,
            "satellite_id": satellite_id
        })


def read_fire_values_from_file(filename) -> List[dict]:
    """
    The function perform reading from file and pushing fire value dict to list
    :params filename: store a path to file with data
    :return List[dict]:
    """

    fire_values: List[dict] = []

    # Read file with fire points
    with open(filename, 'r') as f:
        for line in f:
            tmp_line = line.rstrip('\n')
            latitude, longitude, temperature, *_ = tmp_line.split(',')
            fire_values.append({
                "longitude": longitude,
                "latitude": latitude,
                "temperature": temperature,
            })

    return fire_values


def load_fire_values_to_db(db: DataBase, fire_values: List[dict]) -> None:
    """
    The functions perform loading the fire value to database
    :params db: object of the access class to database
    :params fire_values: store fire values list
    :return None:
    """

    print("Insert fire values.")
    # Insert fire values to database
    db.bulk_insert(FireValueModel, fire_values)


def perform_loading_fire_values(
        db: DataBase, source_directory: str, datetime_id: int, satellite_id: int
) -> None:
    """
    The functions perform function calls to load the fire_values to database
    :params db: object of the access class to database
    :params source_directory: source directory that store output files after processing
    :params datetime_id: datetime_id store the id that get from database
    :params satellite_id: satellite_id store the id that get from database
    :return None:
    """

    # 750m fire values
    filename_750m = glob.glob(f"{source_directory}/{conf.PATTERN_FILENAME_750M}")[0]
    # 375m fire values
    filename_375m = glob.glob(f"{source_directory}/{conf.PATTERN_FILENAME_375M}")[0]

    fire_values: List[dict] = []

    for resolution_id, filename in enumerate([filename_375m, filename_750m]):
        tmp_fire_values = read_fire_values_from_file(filename)
        update_fire_value(tmp_fire_values, datetime_id, satellite_id, resolution_id)
        fire_values.extend(tmp_fire_values)

    load_fire_values_to_db(db, fire_values)


def form_file_composite_list(
        tiff_images: list, composites: dict, datetime_id: int, satellite_id: int
) -> List[dict]:
    """
    The function perform forming file_composite list
    :params tiff_directory: directory used for store the tiff image
    :params composites: stores composites in the format {'name': id}
    :params datetime_id: datetime_id store the id that get from database
    :params satellite_id: satellite_id store the id that get from database
    :return list:
    """

    print("Form file_composite list")
    file_composites = []
    for tiff_image in tiff_images:
        path_tmp = tiff_image.rstrip('\n')
        dir_name, filename = os.path.split(path_tmp)

        # Fetch composite from filename
        match = pattern_composite.search(filename)
        composite_name = match.group(1)

        file_composites.append({
            "filename": path_tmp,
            "datetime_id": datetime_id,
            "satellite_id": satellite_id,
            "composite_id": composites[composite_name],
            "datetime_created": datetime.datetime.utcnow(),
            "access_tiles": False
        })

    return file_composites


def load_file_composites_to_db(db: DataBase, file_composites):
    """
    The function perform loading the data of the tiff images to database
    :params db: object of the access class to database
    :params file_composite: store a list of the object file_composite
    :return None:
    """

    print("Insert file_composites.")
    # Insert file_composite to database
    db.bulk_insert(FileCompositeModel, file_composites)


def perform_loading_file_composites(
        db: DataBase, tiff_images: list, composites: dict, datetime_id: int, satellite_id: int
) -> None:
    """
    The function perform function calls to load the file_composite to database
    :params db: object of the access class to database
    :params tiff_directory: directory used for store the tiff image
    :params composites: stores composites in the format {'name': id}
    :params datetime_id: datetime_id store the id that get from database
    :params satellite_id: satellite_id store the id that get from database
    :return None:
    """

    file_composites = form_file_composite_list(tiff_images, composites, datetime_id, satellite_id)
    load_file_composites_to_db(db, file_composites)


def load_composites_to_db(db: DataBase, composites) -> dict:
    """
    The function loads composites to database
    :params db: object of the access class to database
    :return dict:
    """

    output_composites = {}
    for composite in composites:
        instance = db.get_or_create(CompositeModel, **{"name": composite})
        output_composites.update({instance.name: instance.id})
    return output_composites


def load_datetime_to_db(db: DataBase, datetime):
    return db.get_or_create(DateTimeModel, **{"datetime": datetime})


def load_satellite_to_db(db: DataBase, satellite):
    satellites = {
        "npp": {
            "name": "Soumi NPP",
            "tag": "snpp"
        },
        "noaa20": {
            "name": "NOAA-20",
            "tag": "noaa20"
        }
    }
    return db.get_or_create(
        SatelliteModel, **{"name": satellites[satellite]["name"], "tag": satellites[satellite]["tag"]}
    )


def make_directory(directory):
    """
    This function perform creating directory
    :params directory: store path to make directory and subdirectory
    :return None:
    """

    pathlib.Path(directory).mkdir(parents=True, exist_ok=True)


def copy_files_by_template(source_directory_template: str, destination_directory: str):
    """
    Copy files source to destination
    :params source_directory_template: source dir store files with template
    :params destination_directory: destination dir used to save the files
    :return Bool:
    """

    if not os.path.isdir(destination_directory):
        return False
    make_directory(destination_directory)

    for filename in glob.glob(source_directory_template):
        shutil.copy(filename, destination_directory)

    return True


def show_files(directory: str) -> None:
    """
    Show file list by directory
    :params directory: store path to file list
    :return None:
    """

    for _, _, files in os.walk(directory):
        for file in files:
            print(file)


def run(input_raw_file, *options) -> str | None:
    """
    Start processing of the RAW file
    :params input_raw_file: store full path to RAW file
    :params options: some options to run algorithms
    :return str:
    """

    db = DataBase()

    # move to leapsec_dat dir
    print(f"Move to leapsec_dat directory: {conf.LEAPSEC_DAT_PATH}")
    os.chdir(conf.LEAPSEC_DAT_PATH)

    tmp_options = list(*options)
    options = tmp_options if tmp_options else ["-g", ]

    # run algorithms
    print("Start algorithm service")
    result_algorithm = subprocess.run(
        ["sh", conf.STARTUP_ALGORITHM_SCRIPT_FILENAME, *options, input_raw_file],
        capture_output=True
    )

    match = pattern_path_output.search(str(result_algorithm.stdout))

    if match:
        output_data_dir = match.group()
    else:
        return None

    # run visualization service (convert from .h5 to .tiff)
    print("Start viewer service")
    result_viewer = subprocess.run(
        ["sh", conf.STARTUP_VIEWER_SCRIPT_FILENAME, output_data_dir],
        capture_output=True
    )

    # fetch date and time from filename
    match = pattern_satellite_datetime_fire_value.search(glob.glob(f"{output_data_dir}/FL*.txt")[0])
    satellite, date, time = match.groups()

    # formatting date time
    print("Formatting date time")
    datetime_fixation = format_date_time(" ".join([date, time]), "%Y%m%d %H%M")

    # get/create to/from db datetime, satellite
    print("Load datetime and satellite")
    instance_datetime = load_datetime_to_db(db, datetime_fixation)
    instance_satellite = load_satellite_to_db(db, satellite)

    # loading fire_values
    print("Perform loading fire values")
    perform_loading_fire_values(db, output_data_dir, instance_datetime.id, instance_satellite.id)

    # make directory
    new_path_tiff_image = os.path.join(conf.PATH_TIFF_IMAGE, str(date), str(time))
    print(f"Make directory to save tiff images {new_path_tiff_image}")
    make_directory(new_path_tiff_image)

    # copy tif images to directory save
    print(f"Copy tif images to {new_path_tiff_image}")
    copy_files_by_template(os.path.join(output_data_dir, "*.tif"), new_path_tiff_image)

    # show_files(new_path_tiff_image)

    # get/create composites to db
    print("Load composites name to db")
    composites = load_composites_to_db(db, conf.unique_composites)

    # load info about stored tiff images
    print("Perform loading file composites (load tiff image + composite id)")
    tiff_images = glob.glob(f"{new_path_tiff_image}/*.tif")
    perform_loading_file_composites(db, tiff_images, composites, instance_datetime.id, instance_satellite.id)

    return output_data_dir


if __name__ == '__main__':
    db = DataBase()
    db.create_all()

    regex_path_output = r"(\/home\/app-vrsdop\/OUTDATA\/[\w-]+)\/?"
    pattern_path_output = re.compile(regex_path_output)

    try:
        run('', ())
    except Exception as e:
        print(e)

    # db.drop_all()
