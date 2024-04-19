#Перепроектирование, повторная выборка и обрезка растровых данных
#тут опять же нужен шейп файл, но у нас их нет.............

from osgeo import gdal
import numpy as np
import matplotlib.pyplot as plt

# Путь к растровому файлу TIF
tif_file_path = (r"C:\Users\User01\PycharmProjects\VRSDOP-service\backend\TileService\RastFilesInput\test.tif")

# Открываем растровый файл
ds = gdal.Open(tif_file_path)

# Читаем данные из первого канала растра в массив
array = ds.GetRasterBand(1).ReadAsArray()

# Изменяем проекцию растрового файла
dsReprj = gdal.Warp("demReprj.tif", ds, dstSRS="EPSG:4326")

# Изменяем разрешение растрового файла
dsRes = gdal.Warp("demRes.tif", ds, xRes=150, yRes=150, resampleAlg="bilinear")

dsClip = gdal.Warp("demClip.tif", ds, cutlineDSName="star.shp", cropToCutline=True, dstNodata=np.nan)
array = dsClip.GetRasterBand(1).ReadAsArray()
plt.imshow(array)
plt.colorbar()

# Освобождаем ресурсы
ds = dsReprj = dsRes = dsClip = None