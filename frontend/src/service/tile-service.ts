import axios from "axios";
import { IDates } from "@/interfaces/IDates";
import { Mark } from "@mui/base";
import { ISatelliteResponse } from "@/interfaces/ISatelliteResponse";

export default class TileService {
    static async getDates(url: string): Promise<IDates> {
        // Хардкод дат (17-30 июня 2023) — чтобы календарь подсвечивал
        const dotDates = [
            "2023-06-17", "2023-06-18", "2023-06-19", "2023-06-20",
            "2023-06-21", "2023-06-22", "2023-06-23", "2023-06-24",
            "2023-06-25", "2023-06-26", "2023-06-27", "2023-06-28",
            "2023-06-29", "2023-06-30"
        ];
        
        const nonDotDates = dotDates.map(d => d.replace(/-/g, ""));
        
        return { dotdates: dotDates, nondotdates: nonDotDates };
    }

    static async getTimes(date: string): Promise<Mark[]> {
        // Возвращаем время 12:00 по умолчанию
        return [{ label: "1200", value: 1200 }];
    }

    static async getSatellites(): Promise<ISatelliteResponse[]> {
        return [
            { id: 1, name: "Suomi NPP", tag: "snpp" },
            { id: 2, name: "NOAA-20", tag: "noaa20" },
        ];
    }

    static async getComposites(satellite: string, date: string, time: string) {
        return { data: { composites: [] } };
    }
}