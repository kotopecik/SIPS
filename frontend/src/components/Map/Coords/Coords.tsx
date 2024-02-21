import React, {useState} from 'react';
import s from './Coords.module.scss'
import {useMapEvents} from "react-leaflet";

const Coords = () => {
    const [mousePos, setMousePos] = useState({ lat: 0, lng: 0 });

    const _coords = useMapEvents({
        mousemove: (event) => {
            setMousePos(event.latlng);
        },
    });

    return (
        <div>
            <div className={s.coords}>
                <div>{mousePos.lat.toFixed(5)} lat</div>
                <div>{mousePos.lng.toFixed(5)} lng</div>
            </div>
        </div>
    );
};

export default Coords;