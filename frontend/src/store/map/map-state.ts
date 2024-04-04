import {IPolygons} from "@/interfaces/IPolygons";
import {IBorder} from "@/interfaces/IBorder";
import {Map} from "leaflet";

export interface MapState{
    layer: string,
    polygons: IPolygons,
    borders: IBorder[],
    map: Map,
    isLoading: boolean,
    isRegions: boolean,
    isNatureReserves: boolean,
    isSettlements: boolean
}