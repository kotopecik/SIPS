import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {MapState} from "@/store/map/map-state";
import {fetchRegions} from "@/store/map/map-actions";


const initialState = {
    layer: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
    regions: []
}as MapState


const mapSlice = createSlice({
    name: 'map',
    initialState,
    reducers:{
        setLayer(state, action){
            state.layer = action.payload
        },
        refreshRegions(state){
            state.regions = []
        }
    },
    extraReducers:(builder) => {
        builder.addCase(fetchRegions.fulfilled, (state, action) => {
            state.regions = action.payload
        })
        .addCase(fetchRegions.pending,() => {
        })
        .addCase(fetchRegions.rejected,() => {
        })
    }
})

export const {setLayer, refreshRegions} = mapSlice.actions
export default mapSlice.reducer