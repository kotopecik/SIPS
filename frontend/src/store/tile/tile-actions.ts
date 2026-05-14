import { createAsyncThunk } from "@reduxjs/toolkit";
import TileService from "@/service/tile-service";
import { IDates } from "@/interfaces/IDates";
import { Mark } from "@mui/base";
import { ISatelliteResponse } from "@/interfaces/ISatelliteResponse";
import { ICompositeResponse } from "@/interfaces/ICompositeResponse";

export const fetchDates = createAsyncThunk<IDates, string | undefined>(
  "tile/fetchDates",
  async (_unusedUrl) => {
    try {
      return await TileService.getDates();
    } catch (err) {
      console.error(err);

      return {
        dotdates: [],
        nondotdates: [],
      };
    }
  }
);

export const fetchTimes = createAsyncThunk<Mark[], string>(
  "tile/fetchTimes",
  async (date: string) => {
    try {
      return await TileService.getTimes(date);
    } catch (err) {
      console.error(err);
      return [];
    }
  }
);

export const fetchSatellites = createAsyncThunk<ISatelliteResponse[]>(
  "tile/fetchSatellites",
  async () => {
    try {
      return await TileService.getSatellites();
    } catch (err) {
      console.error(err);
      return [];
    }
  }
);

interface FetchCompositesPayload {
  satellite: string;
  dotdate: string;
  dottime: string;
}

export const fetchComposites = createAsyncThunk<
  ICompositeResponse,
  FetchCompositesPayload
>(
  "tile/fetchComposites",
  async (obj: FetchCompositesPayload) => {
    try {
      const response = await TileService.getComposites(
        obj.satellite,
        obj.dotdate,
        obj.dottime
      );

      return {
        composites: response.composites ?? response.data?.composites ?? [],
      };
    } catch (err) {
      console.error(err);

      return {
        composites: [],
      };
    }
  }
);