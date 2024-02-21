import {IRegion} from "@/interfaces/IRegion";
import {LatLngLiteral} from "leaflet";

export interface MapState{
    layer: string,
    regions: IRegion[],
    mousePos: LatLngLiteral,
    isRulerActive: boolean
}