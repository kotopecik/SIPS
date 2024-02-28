import {configureStore} from '@reduxjs/toolkit'
import mapReducer from './map/map-slice'
import cursorReducer from './cursor/cursor-slice'
import rulerReducer from './ruler/ruler-slice'




export const store = configureStore({
    reducer:{
        map: mapReducer,
        cursor: cursorReducer,
        ruler: rulerReducer
    },

})

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;