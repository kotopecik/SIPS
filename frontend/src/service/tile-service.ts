import axios, {AxiosResponse} from "axios";
import {IDate} from "@/interfaces/IDate";

export default class TileService{
    static async getDates(url: string): Promise<AxiosResponse<IDate[]>>{
        return axios.get(url)
    }
}