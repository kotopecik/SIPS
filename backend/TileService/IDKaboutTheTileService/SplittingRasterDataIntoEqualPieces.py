#Разделение растровых данных на равные части

import matplotlib.pyplot as plt
from osgeo import gdal

dem = gdal.Open(r"C:\Users\User01\PycharmProjects\VRSDOP-service\backend\TileService\RastFilesInput\test.tif")
# Получение геотрансформации растрового файла
gt = dem.GetGeoTransform()

# Извлечение информации о границах и размерах растрового файла
xmin = gt[0]
ymax = gt[3]
res = gt[1]
xlen = res * dem.RasterXSize
ylen = res * dem.RasterYSize

# Задание количества разделений по осям X и Y
xdiv = 2
ydiv = 2

# Вычисление размеров каждой части
xsize = xlen / xdiv
ysize = ylen / ydiv

# Вычисление границ для каждой части
xsteps = [xmin + xsize * i for i in range(xdiv + 1)]
ysteps = [ymax - ysize * i for i in range(ydiv + 1)]

# Цикл разделения растровых данных
for i in range(xdiv):
    for j in range(ydiv):
        # Определение границ текущей части
        xmin = xsteps[i]
        xmax = xsteps[i + 1]
        ymax = ysteps[j]
        ymin = ysteps[j + 1]

        # Вывод границ текущей части
        print("xmin: " + str(xmin))
        print("xmax: " + str(xmax))
        print("ymin: " + str(ymin))
        print("ymax: " + str(ymax))
        print("\n")

        # Выполнение операции разделения
        gdal.Warp("dem" + str(i) + str(j) + ".tif", dem,
                  outputBounds=(xmin, ymin, xmax, ymax), dstNodata=-9999)

        # Визуализация данных текущей части
        dataset = gdal.Open("dem" + str(i) + str(j) + ".tif")
        array = dataset.ReadAsArray()
        plt.imshow(array, cmap='gray')
        plt.show()

        # Освобождение ресурсов
        dem = None