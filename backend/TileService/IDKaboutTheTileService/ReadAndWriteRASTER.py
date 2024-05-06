from osgeo import gdal
import numpy as np
import matplotlib.pyplot as plt

# Открываем растровый файл
ds = gdal.Open(r"C:\Users\User01\PycharmProjects\VRSDOP-service\backend\TileService\RastFilesInput\test.tif")

# Получаем геотрансформацию и проекцию
gt = ds.GetGeoTransform()
proj = ds.GetProjection()

# Получаем первый канал растра
band = ds.GetRasterBand(1)
array = band.ReadAsArray()

# Создаем бинарную маску
binmask = np.where((array >= np.mean(array)), 1, 0)

# Сохраняем бинарную маску в новый растровый файл
driver = gdal.GetDriverByName("GTiff")
outds = driver.Create("binmask.tif", xsize=binmask.shape[1],
                      ysize=binmask.shape[0], bands=1,
                      eType=gdal.GDT_Int16)
outds.SetGeoTransform(gt) # Устанавливает географическую привязку для нового растрового файла
outds.SetProjection(proj) # Устанавливает проекцию для нового растрового файла
outband = outds.GetRasterBand(1) # Устанавливает значение пикселя, которое будет считаться отсутствующим или неподходящим для анализа
outband.WriteArray(binmask)
outband.SetNoDataValue(np.nan)
outband.FlushCache()

outband = None
outds = None

# Выводим информацию о геометрии и проекции растра
print("Геотрансформация:", gt)
print("Проекция:", proj)

# Выводим массив данных
print("Массив данных:", array)

# Визуализируем массив данных
plt.imshow(array, cmap='gray')
plt.colorbar()
plt.show()