import {createAsyncThunk} from "@reduxjs/toolkit";
import TileService from "@/service/tile-service";
import {ICompositeResponse} from "@/interfaces/ICompositeResponse";

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
        try {
            return (await TileService.getTimes(date))
        }catch (err){
            console.log(err)
        }
    }
)

export const fetchSatellites = createAsyncThunk('tile/fetchSatellites',
    async () => {
        try {
            return (await  TileService.getSatellites())
        }catch (err) {
            console.log(err)
        }
    }
)

interface Obj{
    satellite: string,
    dotdate:string,
    dottime:string
}

export const fetchComposites = createAsyncThunk('tile/fetchComposites',
    async (obj:Obj) => {
        try {
            return (await TileService.getComposites(obj.satellite, obj.dotdate, obj.dottime)).data
        }catch (err) {
            return {composites : []}
        }
    }
)
