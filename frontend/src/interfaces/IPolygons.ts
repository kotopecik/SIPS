import {IRegion} from "@/interfaces/IRegion";
import {LatLngExpression} from "leaflet";
import {ICity} from "@/interfaces/ICity";

export interface IPolygons{
    regions: IRegion[],
    natureReserves: LatLngExpression[][],
    cities: ICity[],
}