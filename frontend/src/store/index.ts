import {configureStore} from '@reduxjs/toolkit'
import mapReducer from './map/map-slice'





export const store = configureStore({
    reducer:{
        map: mapReducer
    },

})

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;