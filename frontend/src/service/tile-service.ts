import axios, {AxiosResponse} from "axios";
import {IDates} from "@/interfaces/IDates";
import {Mark} from "@mui/base";
import {ISatelliteResponse} from "@/interfaces/ISatelliteResponse";
import {ICompositeResponse} from "@/interfaces/ICompositeResponse";

export default class TileService{
    static async getDates(url: string): Promise<IDates>{
        let dotDates:string[] = Object.values((await axios.get(`http://84.237.93.16:8080/api/vICOD/dates`)).data.dates["2023"]["06"])
        let nonDotDates: string[] = []
        for(let i = 0; i < dotDates.length; ++i){
            nonDotDates.push(dotDates[i].replace(/-/g, ''))
        }
        console.log(dotDates)
        return {dotdates: dotDates, nondotdates: nonDotDates}
    }

    static async getTimes(date: string):Promise<Mark[]> {
        let times:string = await (await (axios.get(`http://84.237.93.16:8080/api/vICOD/dates/${date}/times`))).data.times
        let newTimes:Mark[] = []
        for(let i = 0; i < times.length; ++i){
            newTimes.push({
                label: times[i],
                value: Number(times[i].replace(':', ''))
            })
        }

        return newTimes
    }

    static async getSatellites():Promise<ISatelliteResponse[]>{
        return (await axios.get(`http://84.237.93.16:8080/api/vICOD/satellites`)).data
    }

    static async getComposites(satellite: string, date: string, time:string): Promise<AxiosResponse<ICompositeResponse>>{
        return (await axios.get(`http://84.237.93.16:8080/api/vICOD/composites/${satellite}/${date}/${time}`))
    }
}