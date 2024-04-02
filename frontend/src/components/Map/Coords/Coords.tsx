import React from 'react';
import s from './Coords.module.scss'
import {useMapEvents} from "react-leaflet";
import {useAppDispatch, useAppSelector} from "@/hooks/hook";
import {setMousePos} from "@/store/cursor/cursor-slice";
import {LatLngLiteral} from "leaflet";
import {disableMapDragging, enableMapDragging} from "@/store/map/map-slice";

const Coords = () => {

    const mousePos: LatLngLiteral = useAppSelector(state => state.cursor).mousePos
    const dispatch = useAppDispatch()


    const _coords = useMapEvents({

        mousemove: (event) => {
            dispatch(setMousePos({lat: event.latlng.lat, lng: event.latlng.lng}));
        },
    });

    const handleMouseDown = () => {
        dispatch(disableMapDragging())
    }
    const handleMouseUp = () => {
        dispatch(enableMapDragging())
    }

    return (
        <div
            className={s.coords}
            onMouseDown={handleMouseDown}
            onMouseUp={handleMouseUp}
        >
            <div>{mousePos.lat.toFixed(5)} с.ш</div>
            <div>{mousePos.lng.toFixed(5)} в.д</div>
        </div>
    );
};

export default Coords;