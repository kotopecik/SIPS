import {configureStore,} from '@reduxjs/toolkit'
import mapReducer from './map/map-slice'
import cursorReducer from './cursor/cursor-slice'
import rulerReducer from './ruler/ruler-slice'
import tileReducer from './tile/tile-slice'
import {GetDefaultMiddleware} from "@reduxjs/toolkit/dist/getDefaultMiddleware";


export const store = configureStore({
    reducer:{
        map: mapReducer,
        cursor: cursorReducer,
        ruler: rulerReducer,
        tile: tileReducer
    },
    middleware: (getDefaultMiddleware:GetDefaultMiddleware) => {
        return getDefaultMiddleware({
            thunk: true,
            serializableCheck: false,
        });
    },
})

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;