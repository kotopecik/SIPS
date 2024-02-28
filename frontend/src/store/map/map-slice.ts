import {createSlice} from "@reduxjs/toolkit";
import {MapState} from "@/store/map/map-state";
import {fetchRegions} from "@/store/map/map-actions";
import {ERegions} from "@/enums/ERegions";


const initialState = {
    layer: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
    polygons:{
        regions: [],
        natureReserves: [],
    },
    mousePos: { lat: 0, lng: 0 },
    isRulerActive: false,
    rulerMarkers: [],
    rulerMarkersPos: []
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
            }

        },
        setMousePos(state, action){
            state.mousePos.lat = action.payload.lat
            state.mousePos.lng = action.payload.lng
        },
        changeIsRulerActive(state){
            state.isRulerActive = !state.isRulerActive
        },
        addRulerMarker(state, action){
            state.rulerMarkers.push(action.payload)
        },
        addRulerMarkerPos(state, action){
            state.rulerMarkersPos.push(action.payload)
        },
        removeRulerMarkers(state){
            state.rulerMarkers = []
            state.rulerMarkersPos = []
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
            }

        })
    }
})

export const {setLayer, refreshRegions, setMousePos, changeIsRulerActive, addRulerMarker, addRulerMarkerPos, removeRulerMarkers} = mapSlice.actions
export default mapSlice.reducer