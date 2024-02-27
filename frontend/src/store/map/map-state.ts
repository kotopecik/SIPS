
import {LatLngExpression, LatLngLiteral} from "leaflet";
import {IPolygons} from "@/interfaces/IPolygons";
import {IMarker} from "@/interfaces/IMarker";

export interface MapState{
    layer: string,
    polygons: IPolygons
    mousePos: LatLngLiteral,
    isRulerActive: boolean,
    rulerMarkers: IMarker[],
    rulerMarkersPos: LatLngExpression[]
}