from PIL import Image

def crop_image(image_path, points):
    image = Image.open(image_path)
    cropped_images = []
    for point in points:
        x, y = point
        cropped_image = image.crop((x, y, x+1, y+1))
        cropped_images.append(cropped_image)
    return cropped_images

image_path = r'C:\Users\User01\PycharmProjects\VRSDOP-service\backend\TileService\RastFilesInput\1fit.tif'
points = [(600, 700), (800, 900), (1000, 1200)]
cropped_images = crop_image(image_path, points)

# Вывод результатов
for i, cropped_image in enumerate(cropped_images):
    cropped_image.save(f'cropped_image_{i}.png')

