import React from 'react';
import s from './Coords.module.scss'
import {useMapEvents} from "react-leaflet";
import {useAppDispatch, useAppSelector} from "@/hooks/hook";
import {setMousePos} from "@/store/map/map-slice";
import {LatLngLiteral} from "leaflet";

const Coords = () => {

    const mousePos: LatLngLiteral = useAppSelector(state => state.map).mousePos
    const dispatch = useAppDispatch()


    const _coords = useMapEvents({

        mousemove: (event) => {
            dispatch(setMousePos({lat: event.latlng.lat, lng: event.latlng.lng}));
        },
    });

    return (
        <div className={s.coords}>
            <div>{mousePos.lat.toFixed(5)} с.ш</div>
            <div>{mousePos.lng.toFixed(5)} в.д</div>
        </div>
    );
};

export default Coords;