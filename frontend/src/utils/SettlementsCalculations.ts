import {LatLngBounds, LatLngExpression} from "leaflet";
import {EZoom} from "@/enums/EZoom";
import {EType} from "@/enums/EType";

const zoomToTypeMap = new Map<EZoom, EType>([
    [EZoom.CITY, EType.CITY],
    [EZoom.VILLAGE, EType.VILLAGE],
    [EZoom.EMPTY, EType.EMPTY],
    [EZoom.TOWN, EType.TOWN],
    [EZoom.HAMLET, EType.HAMLET]
]);

export class SettlementsCalculations{
    static isCoordinateInsideBounds(coordinate: LatLngExpression, bounds: LatLngBounds): boolean {
        const lat = coordinate[0]
        const lng = coordinate[1]

        return lat >= bounds.getSouthWest().lat &&
            lat <= bounds.getNorthEast().lat &&
            lng >= bounds.getSouthWest().lng &&
            lng <= bounds.getNorthEast().lng;
    }

    static getType(zoom: number): EType {
        // я пытался по умному
        // return zoomToTypeMap.get(zoom) || EType.EMPTY;
        switch (zoom){
            case 1:
            case 2:
            case 3:
            case 4:
            case 5:{
                return EType.CITY
            }
            case 6:
            case 7:
            case 8:
            case 9:{
                return EType.TOWN
            }

            case 10:{
                return EType.VILLAGE
            }
            default:{
                return EType.HAMLET
            }
        }

    }
}