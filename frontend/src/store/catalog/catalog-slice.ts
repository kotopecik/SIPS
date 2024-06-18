import { createSlice } from "@reduxjs/toolkit";
import { CatalogState } from "./catalog-state";
import { fetchCatalogItems, fetchCatalogTimes } from "./catalog-actions";
import { IImage } from "@/interfaces/IImage";


const initialState = {
    sattelite : '',
    composite : '',
    start_day : '',
    end_day : '',
    catalogItems : [],
    images : [],
    datetimes : []
} as CatalogState


const catalogSlice = createSlice({
    name : 'catalog',
    initialState,
    reducers : {
        setSatelliteS(state, action){
            state.sattelite = action.payload
            console.log()
        },
        setCompositeS(state, action){
            state.composite = action.payload
            console.log()
        },
        setStartDayS(state, action){
            state.start_day = action.payload
            console.log(state.start_day)
        },
        setEndDayS(state, action){
            state.end_day = action.payload
            console.log(state.end_day)
        },
        setImages(state, action){
            state.images = action.payload
            console.log(state.images)
        }
    },
    extraReducers:(builder) => {
        builder
            .addCase(fetchCatalogItems.fulfilled, (state, action) => {
                state.catalogItems = action.payload
                console.log(state.catalogItems)
            })
            .addCase(fetchCatalogTimes.fulfilled, (state, action) => {
                state.datetimes = action.payload

                action.payload.forEach((el) => {
                    let image = {
                        datetime: el,
                        composite: state.composite,
                        satellite: state.sattelite
                    };
                    state.images.push(image)
                })
            })
        }
})

export const {
    setSatelliteS,
    setCompositeS,
    setStartDayS,
    setEndDayS,
    setImages
} = catalogSlice.actions
export default catalogSlice.reducer