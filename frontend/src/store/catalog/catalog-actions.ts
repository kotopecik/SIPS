import { createAsyncThunk } from "@reduxjs/toolkit";


export const fetchCatalogItems = createAsyncThunk('catalog/fetchCatalogItems',
    async () => {
        try{
            //const response = await AuthService.logout()
        }catch (err){
            console.log("fetchCatalogItems failed")
            console.log(err)
        }

    },
)