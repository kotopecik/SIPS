import { IImage } from "@/interfaces/IImage";
import api from "@/http";
import { ImageResponse } from "@/interfaces/response/ImageResponse";
import { DatesResponse } from "@/interfaces/response/DatesResponse";
import { IImages } from "@/interfaces/IImages";

export default class CatalogService{
    static async getItems(images : IImage[]){
        console.log('start get')
        let imagess : IImages = {
            images: images
        }
        console.log(imagess.images)
        return api.post<ImageResponse>('/vCD/composites/urls', imagess)
    }
    static async getTimes(date : string){
        return api.post<DatesResponse>(`/vICOD/dates/${date}/times`, date)
    }

    static async downloadImage(uid : string){
        try {
            const response = await api.get(`http://84.237.93.16:8080/api/vCD/composites/download/${uid}`, {
                responseType: 'blob' 
            });
            const url = window.URL.createObjectURL(new Blob([response.data]));

            
            const a = document.createElement('a');
            a.href = url;
            a.download = `image_${uid}.tif`; 
            document.body.appendChild(a); 
            a.click(); 
            document.body.removeChild(a); 
        } catch (error) {
            console.error('Ошибка при скачивании файла:', error);
        }
    }



    static async newGetItems(images: IImage[]) {
        const token = localStorage.getItem('token');
        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({ images })
        };
        const url = 'http://84.237.93.16:8080/api/vCD/composites/urls';
        
        try {
            const response = await fetch(url, options);
            if (!response.ok) {
                throw new Error(response.statusText);
            }
            const responseData = await response.json();
            return responseData; 
        } catch (err) {
            console.error("Error in newGetItems:", err);
            throw err;
        }
    }
}