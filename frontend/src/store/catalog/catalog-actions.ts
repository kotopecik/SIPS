import CatalogService from "@/service/catalog-service";
import { createAsyncThunk } from "@reduxjs/toolkit";


export const fetchCatalogItems = createAsyncThunk('catalog/fetchCatalogItems',
    async () => {
        try{
            //const response = await CatalogService.getItems()
        }catch (err){
            console.log("fetchCatalogItems failed")
            console.log(err)
        }

    },
)