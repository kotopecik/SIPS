import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import dayjs from "dayjs";
import { Mark } from "@mui/base";
import { ISatelliteResponse } from "@/interfaces/ISatelliteResponse";
import { ESatellite } from "@/enums/ESatellite";
import { EComposite } from "@/enums/EComposite";

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
  dotdates: [],
  nondotdates: [
    "20230617", "20230618", "20230619", "20230620",
    "20230621", "20230622", "20230623", "20230624",
    "20230625", "20230626", "20230627", "20230628",
    "20230629", "20230630"
  ],
  dateTime: { dotdate: "2023-06-20", nondotdate: "20230620", time: "1200" },
  times: [{ label: "1200", value: 1200 }],
  satellites: [
    { id: 1, name: "Suomi NPP", tag: ESatellite.SUOMI_NPP },
    { id: 2, name: "NOAA-20", tag: ESatellite.NOAA_20 },
  ],
  composites: [
    "aot550", "aotaps", "clphs", "clmsk", "clmsk2",
    "frmsk", "vievi", "vindvi", "vlst", "vscmo"
  ],
  satellite: "snpp" as ESatellite,
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
    removeTimes: (state) => { state.times = []; },
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