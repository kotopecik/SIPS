import {createAsyncThunk} from "@reduxjs/toolkit";
import TileService from "@/service/tile-service";

export const fetchDates = createAsyncThunk('tile/fetchDates',
    async (url:string) => {
        try {
            return (await TileService.getDates(url))
        }catch (err){
            console.log(err)
        }
    },
)

export const fetchTimes = createAsyncThunk('tile/fetchTimes',
    async (date: string) => {
    console.log(date)
        try {
            return (await TileService.getTimes(date))
        }catch (err){
            console.log(err)
        }
    }

)
