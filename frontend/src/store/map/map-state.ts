
import {LatLngExpression, LatLngLiteral} from "leaflet";
import {IPolygons} from "@/interfaces/IPolygons";
import {IMarker} from "@/interfaces/IMarker";

export interface MapState{
    layer: string,
    polygons: IPolygons

    dragging: boolean
}