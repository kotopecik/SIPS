import api from "@/http";
import { IDates } from "@/interfaces/IDates";
import { Mark } from "@mui/base";
import { ISatelliteResponse } from "@/interfaces/ISatelliteResponse";

type CompositeResponse = {
  data?: {
    composites?: string[];
  };
  composites?: string[];
};

export default class TileService {
  static async getDates(): Promise<IDates> {
    const response = await api.get<IDates>("/vICOD/dates");
    return response.data;
  }

  static async getTimes(date: string): Promise<Mark[]> {
    const response = await api.post<Mark[]>(`/vICOD/dates/${date}/times`, {
      date,
    });

    return response.data;
  }

  static async getSatellites(): Promise<ISatelliteResponse[]> {
    const response = await api.get<ISatelliteResponse[]>("/vICOD/satellites");
    return response.data;
  }

  static async getComposites(
    satellite: string,
    date: string,
    time: string
  ): Promise<CompositeResponse> {
    const response = await api.get<CompositeResponse>("/vCD/composites", {
      params: {
        satellite,
        date,
        time,
      },
    });

    return response.data;
  }
}