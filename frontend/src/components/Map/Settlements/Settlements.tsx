import React, {useEffect} from 'react';
import {Marker, Polygon, Popup, useMap} from "react-leaflet";
import {useAppDispatch, useAppSelector} from "@/hooks/hook";
import {changeBounds, changeZoom} from "@/store/map/map-slice";
import {icons} from "@/data/icons";
import {SettlementsCalculations} from "@/utils/SettlementsCalculations";
import {ISettlement} from "@/interfaces/ISettlement";


export default React.memo(function Settlements(){

    const blueOptions = { color: 'blue' }
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
                SettlementsCalculations.getTypeArray(zoom).includes(settlement.type)
                && SettlementsCalculations.isCoordinateInsideBounds([settlement.latitude, settlement.longitude], bounds, settlement.type)
                && ((zoom > 9 && settlement.poly !== null) ?
                    <Polygon key = {index} pathOptions={blueOptions} positions={SettlementsCalculations.swapLatAndLng(settlement.poly)}><Popup>{settlement.name}</Popup></Polygon>
                :
                    <Marker icon = {icons().settlementIcon} key = {index} position = {[settlement.latitude, settlement.longitude]}><Popup>{settlement.name}</Popup></Marker>
                )
            ))}
        </>
    );
})