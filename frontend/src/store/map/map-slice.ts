import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {MapState} from "@/store/map/map-state";
import {fetchRegions} from "@/store/map/map-actions";


const initialState = {
    layer: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
    regions: [],
    mousePos: { lat: 0, lng: 0 },
    isRulerActive: false
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
        },
        setMousePos(state, action){
            state.mousePos.lat = action.payload.lat
            state.mousePos.lng = action.payload.lng
        },
        changeIsRulerActive(state){
            state.isRulerActive = !state.isRulerActive
        }
    },
    extraReducers:(builder) => {
        builder.addCase(fetchRegions.fulfilled, (state, action) => {
            state.regions = action.payload
        })
    }
})

export const {setLayer, refreshRegions, setMousePos, changeIsRulerActive} = mapSlice.actions
export default mapSlice.reducer