import {createAsyncThunk} from "@reduxjs/toolkit";
import TileService from "@/service/tile-service";

export const fetchDates = createAsyncThunk('tile/fetchDates',
    async (url:string) => {
        try {
            return (await TileService.getDates(url)).data
        }catch (err){
            console.log(err)
        }
    },
)
