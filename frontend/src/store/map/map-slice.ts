import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {MapState} from "@/store/map/map-state";
import {fetchRegions} from "@/store/map/map-actions";


const initialState = {
    layer: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
    regions: null
}as MapState


const mapSlice = createSlice({
    name: 'map',
    initialState,
    reducers:{
        setLayer(state, action){
            state.layer = action.payload
        },
    },
    extraReducers:(builder) => {
        builder.addCase(fetchRegions.fulfilled, (state, action) => {
            console.log("ful")
            state.regions = action.payload
        })
        .addCase(fetchRegions.pending,() => {
            console.log("pending")
        })
        .addCase(fetchRegions.rejected,() => {
             console.log("rejected")
        })
    }
})

export const {setLayer} = mapSlice.actions
export default mapSlice.reducer