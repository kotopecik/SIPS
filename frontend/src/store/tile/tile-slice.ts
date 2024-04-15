import {createSlice} from "@reduxjs/toolkit";
import {TileState} from "@/store/tile/tile-state";
import {generateDate} from "@/utils/calendar";
import dayjs from "dayjs";
import {fetchDates} from "@/store/tile/tile-actions";

const initialState = {
    dateTime:{
        date: null,
        time: null,
    },
    satellite: null,
    composite: null,
    chanelComposition: "",
    expansion: "",
    calendar: generateDate(dayjs().month(), dayjs().year()),
    currentDate: dayjs(),
} as TileState

const tileSlice = createSlice({
    name: 'tile',
    initialState,
    reducers:{
        setDate(state, action){
            state.dateTime.date = action.payload
        },
        setTime(state, action){
            state.dateTime.time = action.payload
        },
        setSatellite(state, action){
            state.satellite = action.payload
        },
        setComposite(state, action){
          state.composite = action.payload
        },
        setCalendarMonth(state, action){
            state.calendar = generateDate(action.payload.month, action.payload.year)
        },
        incrementCurrentMonth(state){
            state.calendar = generateDate(state.currentDate.month() + 1, state.currentDate.year())
            state.currentDate = state.currentDate.add(1, 'months')
        },
        decrementCurrentMonth(state){
            state.calendar = generateDate(state.currentDate.month() - 1, state.currentDate.year())
            state.currentDate = state.currentDate.subtract(1, 'months')
        },
        incrementCurrentYear(state){
            state.calendar = generateDate(state.currentDate.month(), state.currentDate.year() + 1)
            state.currentDate = state.currentDate.add(1, 'years')
        },
        decrementCurrentYear(state){
            state.calendar = generateDate(state.currentDate.month(), state.currentDate.year() - 1)
            state.currentDate = state.currentDate.subtract(1, 'years')
        },

    },
    extraReducers:(builder) => {
        builder.addCase(fetchDates.fulfilled,  (state: TileState, action) => {
            state.dates = action.payload
        })

    }

})

export const {
    setTime,
    setDate,
    incrementCurrentMonth,
    decrementCurrentMonth,
    setSatellite,
    setComposite,
    setCalendarMonth,
    incrementCurrentYear,
    decrementCurrentYear
} = tileSlice.actions
export default tileSlice.reducer
