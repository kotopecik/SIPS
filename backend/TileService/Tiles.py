import subprocess
import gdal2tiles
from multiprocessing import freeze_support
from PIL import Image
import os


def convert_to_rgba(input_file, output_file):
    # Команда для конвертации в формат RGBA
    command = ['gdal_translate', '-of', 'VRT', '-expand', 'rgba', input_file, output_file]
    subprocess.call(command)


def remove_black(image_path):
    image = Image.open(image_path)
    image = image.convert("RGBA")
    data = image.getdata()

    new_data = []
    for item in data:
        # Заменяем черный цвет (0, 0, 0) на прозрачность (0, 0, 0, 0)
        if item[:3] == (0, 0, 0):
            new_data.append((0, 0, 0, 0))
        else:
            new_data.append(item)

    image.putdata(new_data)
    image.save(image_path, "PNG")


if __name__ == '__main__':
    freeze_support()

    # Входной и выходной файлы
    input_file = r'C:\Users\User01\PycharmProjects\VRSDOP-service\backend\TileService\RastFilesInput\1fit.tif'
    output_file = r'C:\Users\User01\PycharmProjects\VRSDOP-service\backend\TileService\RastFilesOutput\temp.vrt'

    convert_to_rgba(input_file, output_file)

    gdal2tiles.generate_tiles(output_file, r'C:\Users\User01\PycharmProjects\VRSDOP-service\backend\TileService'
                                           r'\RastFilesOutput', nb_processes=2, zoom='7-9')

    tiles_directory = r'C:\Users\User01\PycharmProjects\VRSDOP-service\backend\TileService\RastFilesOutput'

    # Проход по всем файлам в директории тайлов
    for root, dirs, files in os.walk(tiles_directory):
        for file in files:
            if file.endswith(".png"):
                file_path = os.path.join(root, file)
                remove_black(file_path)