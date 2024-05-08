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
    console.log(date)
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

// export const fetchComposites = createAsyncThunk('tile/fetchComposites',
//     async (satellite: string, date: string, time:string): Promise<ICompositeResponse[]> => {
//         try {
//             return (await TileService.getComposites(satellite, date, time))
//         }catch (err) {
//             console.log(err)
//         }
//     }
// )
