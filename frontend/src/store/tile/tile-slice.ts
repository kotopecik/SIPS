import {createSlice} from "@reduxjs/toolkit";
import {TileState} from "@/store/tile/tile-state";
import {convertDates, generateDate} from "@/utils/calendar";
import dayjs from "dayjs";
import {fetchComposites, fetchDates, fetchSatellites, fetchTimes} from "@/store/tile/tile-actions";

const initialState = {
    dateTime:{
        dotdate: null,
        nondotdate: null,
        time: null,
    },
    satellite: null,
    composite: null,
    chanelComposition: "",
    expansion: "",
    calendar: generateDate(dayjs().month(), dayjs().year()),
    currentDate: dayjs(),
    times: []
} as TileState

const tileSlice = createSlice({
    name: 'tile',
    initialState,
    reducers:{
        setDotDate(state, action){
            state.dateTime.dotdate = action.payload
        },
        setNonDotDate(state, action){
            state.dateTime.nondotdate = action.payload
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
        removeTimes(state){
            state.times = []
        }

    },
    extraReducers:(builder) => {
        builder.addCase(fetchDates.fulfilled,  (state: TileState, action) => {
            state.dotdates = action.payload.dotdates
            state.nondotdates = action.payload.nondotdates
        })
        builder.addCase(fetchTimes.fulfilled, (state:TileState, action) => {

            state.times = action.payload
            state.dateTime.time = String(state.times[0].label).replace(':','')
            // console.log(state.dateTime.time)
        })

        builder.addCase(fetchSatellites.fulfilled, (state: TileState, action) => {
            state.satellites = action.payload
        })

        builder.addCase(fetchComposites.fulfilled, (state: TileState, action) => {

            state.composites = action.payload.composites
            console.log(state.composites)
        })



    }

})

export const {
    setTime,
    setDotDate,
    setNonDotDate,
    incrementCurrentMonth,
    decrementCurrentMonth,
    setSatellite,
    setComposite,
    setCalendarMonth,
    incrementCurrentYear,
    decrementCurrentYear,
    removeTimes
} = tileSlice.actions
export default tileSlice.reducer
