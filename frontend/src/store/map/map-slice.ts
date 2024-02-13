import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {MapState} from "@/store/map/map-state";


const initialState = {
    layer: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
}as MapState


const mapSlice = createSlice({
    name: 'map',
    initialState,
    reducers:{
        setLayer(state, action){
            state.layer = action.payload
        },
    },
})

export const {setLayer} = mapSlice.actions
export default mapSlice.reducer