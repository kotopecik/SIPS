import {createSlice} from "@reduxjs/toolkit";
import {MapState} from "@/store/map/map-state";
import {fetchRegions} from "@/store/map/map-actions";
import {ERegions} from "@/enums/ERegions";
import {borders} from "@/data/borders";


const initialState = {
    layer: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
    polygons:{
        regions: [],
        natureReserves: [],
        cities: []
    },
    dragging: true,
    borders: borders
}as MapState


const mapSlice = createSlice({
    name: 'map',
    initialState,
    reducers:{
        setLayer(state, action){
            state.layer = action.payload
        },
        refreshRegions(state, action){
            switch (action.payload){
                case ERegions.REGIONS:{
                    state.polygons.regions = []
                    break
                }
                case ERegions.NATURE_RESERVES:{
                    state.polygons.natureReserves = []
                    break
                }
                case ERegions.CITY:{
                    state.polygons.cities = []
                }
            }
        },
        disableMapDragging(state){
            state.dragging = false
        },
        enableMapDragging(state){
            state.dragging = true
        },
        changeChecked(state, action){
            state.borders[action.payload].checked = !state.borders[action.payload].checked
        }
    },
    extraReducers:(builder) => {
        builder.addCase(fetchRegions.fulfilled, (state:MapState, action) => {
            switch (action.payload.url){
                case ERegions.REGIONS:{
                    state.polygons.regions = action.payload.response
                    break
                }
                case ERegions.NATURE_RESERVES:{
                    state.polygons.natureReserves = action.payload.response
                    break
                }
                case ERegions.CITY:{
                    state.polygons.cities = action.payload.response
                    break
                }
            }
        })
    }
})

export const {
    setLayer,
    refreshRegions,
    disableMapDragging,
    enableMapDragging,
    changeChecked
} = mapSlice.actions
export default mapSlice.reducer