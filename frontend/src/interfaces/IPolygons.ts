import {IRegion} from "@/interfaces/IRegion";
import {LatLngExpression} from "leaflet";

export interface IPolygons{
    regions: IRegion[],
    natureReserves: LatLngExpression[][],
}