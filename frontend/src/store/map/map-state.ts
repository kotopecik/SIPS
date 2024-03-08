import {IPolygons} from "@/interfaces/IPolygons";
import {IBorder} from "@/interfaces/IBorder";
import {LatLngBounds} from "leaflet";

export interface MapState{
    layer: string,
    polygons: IPolygons,
    dragging: boolean,
    borders: IBorder[],
    zoom: number;
    bounds: LatLngBounds
}