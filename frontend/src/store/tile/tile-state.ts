import {ESatellite} from "@/enums/ESatellite";

export interface TileState {
    dateTime:{
        date: string,
        time: string,
    },
    satellite: ESatellite,
    chanelComposition: string,
    expansion: string,
}