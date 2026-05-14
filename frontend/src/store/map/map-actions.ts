import {createAsyncThunk} from "@reduxjs/toolkit";
import MapService from "@/service/map-service";

export const fetchRegions = createAsyncThunk('map/fetchRegions',
    async (url:string) => {
        try {
            const response = (await MapService.getRegions(url)).data
            return {
                response,
                url
            }
        }catch (err){
            console.log(err)
        }
    },
)

