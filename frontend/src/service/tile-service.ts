import axios from "axios";
import { IDates } from "@/interfaces/IDates";
import { Mark } from "@mui/base";
import { ISatelliteResponse } from "@/interfaces/ISatelliteResponse";
import { ICompositeResponse } from "@/interfaces/ICompositeResponse";

const API_URL = "https://gis-eng3.esemc.nsc.ru:8443";

// Хардкод только для дат (пока CORS не починят)
const mockDates = [
  "2023-06-17", "2023-06-18", "2023-06-19", "2023-06-20",
  "2023-06-21", "2023-06-22", "2023-06-23", "2023-06-24",
  "2023-06-25", "2023-06-26", "2023-06-27", "2023-06-28",
  "2023-06-29", "2023-06-30"
];

export default class TileService {
    static async getDates(): Promise<IDates> {
        console.log("✅ Используем хардкод дат (17-30 июня 2023)");
        const nonDotDates = mockDates.map(d => d.replace(/-/g, ''));
        
        return { 
            dotdates: mockDates, 
            nondotdates: nonDotDates 
        };
    }

    static async getTimes(date: string): Promise<Mark[]> {
        try {
            const res = await axios.get(`${API_URL}/api/vicod/dates/${date}/times`);
            const times: string[] = res.data?.times || [];
            return times.map(t => ({
                label: t,
                value: Number(t.replace(':', ''))
            }));
        } catch (err) {
            console.error("Ошибка getTimes:", err);
            return [];
        }
    }

    static async getSatellites(): Promise<ISatelliteResponse[]> {
        try {
            const res = await axios.get(`${API_URL}/api/vicod/satellites`);
            return res.data || [];
        } catch (err) {
            console.error("Ошибка getSatellites:", err);
            return [];
        }
    }

    static async getComposites(satellite: string, date: string, time: string) {
        try {
            return await axios.get(`${API_URL}/api/vicod/composites/${satellite}/${date}/${time}`);
        } catch (err) {
            console.error("Ошибка getComposites:", err);
            return { data: { composites: [] } };
        }
    }
}