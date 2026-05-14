import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import dayjs from "dayjs";
import { Mark } from "@mui/base";
import { ISatelliteResponse } from "@/interfaces/ISatelliteResponse";
import { ESatellite } from "@/enums/ESatellite";
import { EComposite } from "@/enums/EComposite";
import {
  fetchComposites,
  fetchDates,
  fetchSatellites,
  fetchTimes,
} from "@/store/tile/tile-actions";

interface DateTime {
  dotdate: string;
  nondotdate: string;
  time: string;
}

interface TileState {
  currentDate: any;
  calendar: any[];
  dotdates: string[];
  nondotdates: string[];
  dateTime: DateTime;
  times: Mark[];
  satellites: ISatelliteResponse[];
  composites: string[];
  satellite: ESatellite;
  composite: EComposite;
  isLoading: boolean;
}

const initialState: TileState = {
  currentDate: dayjs(),
  calendar: [],
  dotdates: ["2023-06-17"],
  nondotdates: ["20230617"],
  dateTime: {
    dotdate: "2023-06-17",
    nondotdate: "20230617",
    time: "0720",
  },
  times: [{ label: "0720", value: 720 }],
  satellites: [
    { id: 1, name: "Suomi NPP", tag: ESatellite.SUOMI_NPP },
    { id: 2, name: "NOAA-20", tag: ESatellite.NOAA_20 },
  ],
  composites: [
    "aot550",
    "aotaps",
    "clphs",
    "clmsk",
    "clmsk2",
    "frmsk",
    "vievi",
    "vindvi",
    "vlst",
    "vscmo",
  ],
  satellite: ESatellite.SUOMI_NPP,
  composite: "aot550" as EComposite,
  isLoading: false,
};

const tileSlice = createSlice({
  name: "tile",
  initialState,
  reducers: {
    setDotDate: (state, action: PayloadAction<string>) => {
      state.dateTime.dotdate = action.payload;
      state.dateTime.nondotdate = action.payload.replace(/-/g, "");
    },

    setNonDotDate: (state, action: PayloadAction<string>) => {
      state.dateTime.nondotdate = action.payload;
    },

    setTime: (state, action: PayloadAction<string>) => {
      state.dateTime.time = action.payload;
    },

    setSatellite: (state, action: PayloadAction<ESatellite>) => {
      state.satellite = action.payload;
    },

    setComposite: (state, action: PayloadAction<EComposite>) => {
      state.composite = action.payload;
    },

    removeTimes: (state) => {
      state.times = [];
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(fetchDates.pending, (state) => {
        state.isLoading = true;
      })

      .addCase(fetchDates.fulfilled, (state, action) => {
        state.isLoading = false;
        state.dotdates = action.payload.dotdates;
        state.nondotdates = action.payload.nondotdates;
      })

      .addCase(fetchDates.rejected, (state) => {
        state.isLoading = false;
        state.dotdates = ["2023-06-17"];
        state.nondotdates = ["20230617"];
      })

      .addCase(fetchTimes.fulfilled, (state, action) => {
        state.times = action.payload;
      })

      .addCase(fetchSatellites.fulfilled, (state, action) => {
        state.satellites = action.payload;
      })

      .addCase(fetchComposites.fulfilled, (state, action) => {
        state.composites = action.payload.composites;
      });
  },
});

export const {
  setDotDate,
  setNonDotDate,
  setTime,
  setSatellite,
  setComposite,
  removeTimes,
} = tileSlice.actions;

export default tileSlice.reducer;