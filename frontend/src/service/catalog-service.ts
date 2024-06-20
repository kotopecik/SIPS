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

    static async downloadImage(image : IImage){
        const url = `http://84.237.93.16:8080/api/vCD/composites/download/${image.uid}`;

    try {
        const token = localStorage.getItem('token')
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const blob = await response.blob();
        const downloadUrl = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = downloadUrl;
        a.download = `${image.datetime}_${image.composite}_${image.satellite}.tif`; 
        document.body.appendChild(a);
        a.click();
        a.remove();
        window.URL.revokeObjectURL(downloadUrl);
    } catch (error) {
        console.error('There was a problem with the fetch operation:', error);
    }
    }



    static async newGetItems(images: IImage[]) {
        const token = localStorage.getItem('token');
        //const token : string = useAppSelector(state => state.user).token
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