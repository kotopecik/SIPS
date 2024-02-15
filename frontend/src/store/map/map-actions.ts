import {createAsyncThunk} from "@reduxjs/toolkit";
import axios from "axios";

export const fetchRegions = createAsyncThunk('map/fetchRegions',
    async (url:string) => {
        try {
            const response = await axios.get(url, {withCredentials: true})
            console.log(response.data)
            return response.data
        }catch (err){
            console.log(err)
        }
    },
)