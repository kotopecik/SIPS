import subprocess
import gdal2tiles
from PIL import Image
import os


def convert_to_rgba(input_file, output_file):
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


def generate_tiles(input_file, output_dir, options):
    # Конвертация в формат RGBA
    temp_file = os.path.join(output_dir, 'temp.png')
    convert_to_rgba(input_file, temp_file)

    # Открытие изображения
    image = Image.open(temp_file)

    # Замена черного фона на прозрачность
    image = remove_black(image)

    # Сохранение обработанного изображения
    image.save(temp_file, "PNG")

    # Генерация тайлов
    gdal2tiles.generate_tiles(temp_file, output_dir, **options)


if __name__ == '__main__':
    input_file = r'C:\Users\User01\PycharmProjects\VRSDOP-service\backend\TileService\RastFilesInput\2fit.tif'
    output_dir = r'C:\Users\User01\PycharmProjects\VRSDOP-service\backend\TileService\RastFilesOutput'

    options = {
        'nb_processes': 2,
        'zoom': '7-9'
    }

    generate_tiles(input_file, output_dir, options)