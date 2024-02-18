import axios, {AxiosResponse} from "axios";
import {IRegion} from "@/interfaces/IRegion";

export default class MapService{
    static async getRegions(url: string): Promise<AxiosResponse<IRegion[]>>{
        return axios.get(url)
    }
}