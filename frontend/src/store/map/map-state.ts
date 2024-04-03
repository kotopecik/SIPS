import {IPolygons} from "@/interfaces/IPolygons";
import {IBorder} from "@/interfaces/IBorder";
import {LatLngBounds, Map} from "leaflet";

export interface MapState{
    layer: string,
    polygons: IPolygons,
    borders: IBorder[],
    zoom: number;
    bounds: LatLngBounds,
    map: Map,
    isLoading: boolean,
    isRegions: boolean,
    isNatureReserves: boolean,
    isSettlements: boolean
}