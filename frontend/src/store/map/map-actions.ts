import {createAsyncThunk} from "@reduxjs/toolkit";
import MapService from "@/service/map-service";

export const fetchRegions = createAsyncThunk('map/fetchRegions',
    async (url:string) => {
        try {
            const response = await MapService.getRegions(url)
            console.log(response.data)
            return response.data
        }catch (err){
            console.log(err)
        }
    },
)