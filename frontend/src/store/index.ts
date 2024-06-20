import {configureStore,} from '@reduxjs/toolkit'
import mapReducer from './map/map-slice'
import cursorReducer from './cursor/cursor-slice'
import rulerReducer from './ruler/ruler-slice'
import tileReducer from './tile/tile-slice'
import userSlice from './user/user-slice'
import catalogSlice from './catalog/catalog-slice'
import {GetDefaultMiddleware} from "@reduxjs/toolkit/dist/getDefaultMiddleware";


export const store = configureStore({
    reducer:{
        map: mapReducer,
        cursor: cursorReducer,
        ruler: rulerReducer,
        tile: tileReducer,
        user: userSlice,
        catalog : catalogSlice
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