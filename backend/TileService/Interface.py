import re
from CropImage import crop_image

def process_input(data):
    # извлечение данных из JSON-запроса
    image_path = data['image_path']
    points = data['points']
    composite_name = data['composite_name']
    date = data['date']
    time = data['time']

    # проверяем, соответствует ли переданный путь к изображению ожидаемому формату
    if not re.match(r'^.*\.tif$', image_path, re.IGNORECASE):
        print("Ошибка: Неподдерживаемый формат изображения. Поддерживаются только файлы формата TIFF.")
        return

    # вызов crop_image
    cropped_images = crop_image(image_path, points)

    for i, cropped_image in enumerate(cropped_images):
        cropped_image.save(f'cropped_image_{i}.tif', format='TIFF')

#Пример при введении ручками, надо сделат чтобы не ручками
data = {
    'image_path': r'C:\path\to\image.tif',
    'points': [
        [(100, 100), (200, 200), (300, 300)],
        [(400, 400), (500, 500), (600, 600)]
    ],
    'composite_name': 'composite_name',
    'date': '2024-05-10',
    'time': '12:00'
}

process_input(data)