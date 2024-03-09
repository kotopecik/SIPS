import {createSlice} from "@reduxjs/toolkit";
import {TileState} from "@/store/tile/tile-state";

const initialState = {
    dateTime:{
        date: null,
        time: null,
    },
    satellite: null,
    chanelComposition: "",
    expansion: "",
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

    },

})

export const {
    setDate,
    setTime,
    setSatellite,
} = tileSlice.actions
export default tileSlice.reducer