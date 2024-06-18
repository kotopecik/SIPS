import { IImage } from "@/interfaces/IImage";
import api from "@/http";
import { ImageResponse } from "@/interfaces/response/ImageResponse";
import { DatesResponse } from "@/interfaces/response/DatesResponse";

export default class CatalogService{
    static async getItems(images : IImage[]){
        console.log(images)
        return api.apireg.post<ImageResponse>('/vCD/composites/urls', images)
    }
    static async getTimes(date : string){
        return api.api.post<DatesResponse>(`/vICOD/dates/${date}/times`, date)
    }
}