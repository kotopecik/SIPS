import subprocess
import gdal2tiles
from multiprocessing import freeze_support
from PIL import Image
import os


def convert_to_rgba(input_file, output_file):
    # Команда для конвертации в формат RGBA
    command = ['gdal_translate', '-of', 'PNG', '-expand', 'rgba', input_file, output_file]
    subprocess.call(command)


def remove_black(image):
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
    return image


if __name__ == '__main__':
    freeze_support()

    # Входной и выходной файлы
    input_file = r'C:\Users\User01\PycharmProjects\VRSDOP-service\backend\TileService\RastFilesInput\2fit.tif'
    output_file = r'C:\Users\User01\PycharmProjects\VRSDOP-service\backend\TileService\RastFilesOutput\temp.png'

    # Конвертация в формат RGBA
    convert_to_rgba(input_file, output_file)

    # Открытие изображения
    image = Image.open(output_file)

    # Замена черного фона на прозрачность
    image = remove_black(image)

    # Сохранение обработанного изображения
    image.save(output_file, "PNG")

    # Генерация тайлов
    gdal2tiles.generate_tiles(output_file, r'C:\Users\User01\PycharmProjects\VRSDOP-service\backend\TileService'
                                           r'\RastFilesOutput', nb_processes=2, zoom='7-9')