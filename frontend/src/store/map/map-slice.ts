import {createSlice} from "@reduxjs/toolkit";
import {MapState} from "@/store/map/map-state";
import {fetchRegions} from "@/store/map/map-actions";
import {ERegions} from "@/enums/ERegions";
import {borders} from "@/data/borders";
import {EZoom} from "@/enums/EZoom";
import {LatLngBounds} from "leaflet";


const initialState = {
    layer: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
    polygons:{
        regions: [],
        natureReserves: [],
        settlements: []
    },
    dragging: true,
    borders: borders,
    zoom: 4,
    bounds: new LatLngBounds([-110, -170], [100, 200])
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
                case ERegions.SETTLEMENTS:{
                    state.polygons.settlements = []
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
        },
        changeZoom(state, action){
            state.zoom = action.payload
        },
        changeBounds(state, action){
            state.bounds = action.payload
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
                case ERegions.SETTLEMENTS:{
                    state.polygons.settlements = action.payload.response
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
    changeChecked,
    changeZoom,
    changeBounds
} = mapSlice.actions
export default mapSlice.reducer