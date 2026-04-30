import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ICalendar } from "@/interfaces/ICalendar";
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
  calendar: ICalendar[];
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
  nondotdates: [],
  dateTime: { dotdate: "", nondotdate: "", time: "" },
  times: [],
  satellites: [],
  composites: [
    "aot550", "aotaps", "clphs", "clmsk", "clmsk2",
    "frmsk", "vievi", "vindvi", "vlst", "vscmo"
  ],
  satellite: "snpp" as ESatellite,        // ← исправлено
  composite: "aot550" as EComposite,      // ← исправлено
  isLoading: false,
};

const tileSlice = createSlice({
  name: "tile",
  initialState,
  reducers: {
    incrementCurrentMonth: (state) => { state.currentDate = state.currentDate.add(1, "month"); },
    decrementCurrentMonth: (state) => { state.currentDate = state.currentDate.subtract(1, "month"); },
    incrementCurrentYear: (state) => { state.currentDate = state.currentDate.add(1, "year"); },
    decrementCurrentYear: (state) => { state.currentDate = state.currentDate.subtract(1, "year"); },

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

  extraReducers: (builder) => {
    // Добавь сюда свои extraReducers если они были
  }
});

export const {
  incrementCurrentMonth,
  decrementCurrentMonth,
  incrementCurrentYear,
  decrementCurrentYear,
  setDotDate,
  setNonDotDate,
  setTime,
  setSatellite,
  setComposite,
  removeTimes,
} = tileSlice.actions;

export default tileSlice.reducer;