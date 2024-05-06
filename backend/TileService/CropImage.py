from PIL import Image, ImageDraw

def crop_image(image_path, points):
    image = Image.open(image_path)
    cropped_images = []

    for i, point in enumerate(points):
        cropped_image = Image.new('RGBA', image.size)
        draw = ImageDraw.Draw(cropped_image)
        mask_image = Image.new('L', image.size, 0)  # Создаем маску в оттенках серого с прозрачностью
        draw_mask = ImageDraw.Draw(mask_image)
        draw_mask.polygon(point, fill=255)  # Заполняем маску полигоном белого цвета (255)
        cropped_image = Image.composite(image, cropped_image, mask_image)  # Накладываем маску на исходное изображение
        cropped_image = cropped_image.crop(image.getbbox())  # Обрезаем до границ полигона
        cropped_images.append(cropped_image)

    return cropped_images

image_path = r'C:\Users\User01\PycharmProjects\VRSDOP-service\backend\TileService\RastFilesInput\JPSS_viirs_vievi_20230807_071711_wgs84_fit.tif'
points = [
    [(3000, 1000), (3500, 1300), (4000, 1600), (4500, 1900), (5000, 2200),
    (5500, 1900), (6000, 1600), (6500, 1300), (7000, 1000), (3000, 1000)],
    [(3500, 1300), (4000, 1600), (4500, 1900), (5000, 2200), (5500, 1900),
    (6000, 1600), (6500, 1300), (7000, 1000), (7500, 1300), (3500, 1300)],
]

cropped_images = crop_image(image_path, points)

for i, cropped_image in enumerate(cropped_images):
    cropped_image.save(f'cropped_image_{i}.tif', format='TIFF')


