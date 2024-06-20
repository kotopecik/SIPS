
import { IImage } from "@/interfaces/IImage";
import { IImages } from "@/interfaces/IImages";
import CatalogService from "@/service/catalog-service";
import TileService from "@/service/tile-service";
import { createAsyncThunk } from "@reduxjs/toolkit";


export const fetchCatalogItems = createAsyncThunk('catalog/fetchCatalogItems',
    async (images : IImage[]) => {
        try{
            return await CatalogService.newGetItems(images)
        }catch (err){
            console.log("fetchCatalogItems failed")
            console.log(err)
        }

    },
)

export const fetchCatalogTimes = createAsyncThunk('catalog/fetchCatalogTimes',
    async(dates : string[]) => {
        try{
            const arr = await Promise.all(dates.map(async (el) => {
                const response = await TileService.getTimes(el);
                return response.map(el2 => `${el} ${el2.label}`);
            }));
        
            return arr.flat();
        } catch(ex){
            console.log(ex)
        }
    }
)

export const downloadImage = createAsyncThunk('catalog/downloadImage',
    async (image : IImage) => {
        try{
            await CatalogService.downloadImage(image);
        }catch (err){
            console.log(err)
        }
    }
)