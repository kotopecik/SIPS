import subprocess
import gdal2tiles
from multiprocessing import freeze_support


def convert_to_rgba(input_file, output_file):
    # Команда для конвертации в формат RGBA
    command = ['gdal_translate', '-of', 'VRT', '-expand', 'rgba', input_file, output_file]
    subprocess.call(command)


if __name__ == '__main__':
    freeze_support()

    # Входной и выходной файлы
    input_file = r'C:\Users\User01\PycharmProjects\VRSDOP-service\backend\TileService\RastFilesInput\1fit.tif'
    output_file = r'C:\Users\User01\PycharmProjects\VRSDOP-service\backend\TileService\RastFilesOutput\temp.vrt'

    convert_to_rgba(input_file, output_file)

    gdal2tiles.generate_tiles(output_file, r'C:\Users\User01\PycharmProjects\VRSDOP-service\backend\TileService\RastFilesOutput', nb_processes=2, zoom='7-9')