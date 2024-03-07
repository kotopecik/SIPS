import React, {useEffect} from 'react';
import {Marker, Popup, useMap} from "react-leaflet";
import {useAppDispatch, useAppSelector} from "@/hooks/hook";
import {changeBounds, changeZoom} from "@/store/map/map-slice";
import {icons} from "@/data/icons";
import {SettlementsCalculations} from "@/utils/SettlementsCalculations";
import {ISettlement} from "@/interfaces/ISettlement";


export default React.memo(function Settlements(){

    const bounds = useAppSelector(state => state.map).bounds
    const zoom = useAppSelector(state => state.map).zoom
    const settlements:ISettlement[] = useAppSelector(state => state.map).polygons.settlements
    const dispatch = useAppDispatch()
    const map = useMap();

    useEffect(() => {
        const handleZoomEnd = () => {
            dispatch(changeZoom(map.getZoom()))
            dispatch(changeBounds(map.getBounds()))

        };
        const handleMoveEnd = () => {
            dispatch(changeBounds(map.getBounds()))
        };
        map.on("zoomend", handleZoomEnd);
        map.on("moveend", handleMoveEnd);

        return () => {
            map.off("zoomend", handleZoomEnd);
            map.off("moveend", handleMoveEnd);
        };
    }, [map]);

 

    //cities, towns, villages

    return (
        <>
            {settlements.map((settlement:ISettlement, index) => (
                settlement.type === SettlementsCalculations.getType(zoom)
                && SettlementsCalculations.isCoordinateInsideBounds([settlement.latitude, settlement.longitude], bounds)
                && <Marker icon = {icons().customIcon} key = {index} position = {[settlement.latitude, settlement.longitude]}>
                    <Popup>
                        {settlement.name}
                    </Popup>
                </Marker>
            ))}
        </>
    );
})