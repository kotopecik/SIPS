
import {LatLngLiteral} from "leaflet";
import {IPolygons} from "@/interfaces/IPolygons";

export interface MapState{
    layer: string,
    polygons: IPolygons
    mousePos: LatLngLiteral,
    isRulerActive: boolean
}