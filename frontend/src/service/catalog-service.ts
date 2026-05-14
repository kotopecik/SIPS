import { IImage } from "@/interfaces/IImage";
import api from "@/http";
import { IImages } from "@/interfaces/IImages";

export default class CatalogService {
  static async getItems(images: IImage[]): Promise<IImages> {
    const payload: IImages = { images };

    const response = await api.post<IImages>("/vCD/composites/urls", payload);

    return response.data;
  }

  static async getTimes(date: string) {
    const response = await api.post(`/vICOD/dates/${date}/times`, { date });

    return response.data;
  }

  static async downloadImage(image: IImage): Promise<void> {
    if (!image.uid) {
      console.error("Невозможно скачать изображение: отсутствует uid", image);
      return;
    }

    const response = await api.get(`/vCD/composites/download/${image.uid}`, {
      responseType: "blob",
    });

    const blob = new Blob([response.data]);
    const downloadUrl = window.URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = downloadUrl;
    a.download = `${image.datetime}_${image.composite}_${image.satellite}.tif`;

    document.body.appendChild(a);
    a.click();
    a.remove();

    window.URL.revokeObjectURL(downloadUrl);
  }

  static async newGetItems(images: IImage[]): Promise<IImages> {
    return this.getItems(images);
  }
}