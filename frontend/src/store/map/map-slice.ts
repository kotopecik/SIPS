import {createSlice} from "@reduxjs/toolkit";
import {MapState} from "@/store/map/map-state";
import {fetchRegions} from "@/store/map/map-actions";
import {borders} from "@/data/borders";
import {EUrls} from "@/enums/EUrls";


const initialState = {
    layer: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
    polygons:{
        regions: [],
        natureReserves: [],
        settlements: []
    },
    borders: borders,
    isLoading: false,
    isRegions: false,
    isNatureReserves: false,
    isSettlements: false
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
                case EUrls.REGIONS_URL:{
                    state.isRegions = !state.isRegions
                    break
                }
                case EUrls.NATURE_RESERVES_URL:{
                    state.isNatureReserves = !state.isNatureReserves
                    break
                }
                case EUrls.SETTLEMENTS_URL:{
                    state.isSettlements = !state.isSettlements
                    break
                }
            }
        },
        changeChecked(state, action){
            state.borders[action.payload].checked = !state.borders[action.payload].checked
        },
    },
    extraReducers:(builder) => {
        builder.addCase(fetchRegions.fulfilled, (state:MapState, action) => {
            switch (action.payload.url){
                case EUrls.REGIONS_URL:{
                    state.polygons.regions = action.payload.response
                    state.isRegions = true
                    state.isLoading = false
                    break
                }
                case EUrls.NATURE_RESERVES_URL:{
                    state.polygons.natureReserves = action.payload.response
                    state.isNatureReserves = true
                    state.isLoading = false
                    break
                }
                case EUrls.SETTLEMENTS_URL:{
                    state.polygons.settlements = action.payload.response
                    state.isSettlements = true
                    state.isLoading = false
                    break
                }
            }
        }),
        builder.addCase(fetchRegions.pending, (state:MapState) => {
            state.isLoading = true
        })
    }
})

export const {
    setLayer,
    refreshRegions,
    changeChecked,
} = mapSlice.actions
export default mapSlice.reducer