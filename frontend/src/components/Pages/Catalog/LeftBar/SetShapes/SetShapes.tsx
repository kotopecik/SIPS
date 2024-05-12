import React, {useState} from 'react';
import s from './SetShapes.module.scss'
import {FaRegTrashAlt} from "react-icons/fa";
import {BsBoundingBoxCircles} from "react-icons/bs";
import {LuStopCircle} from "react-icons/lu";
import {PiPolygonBold} from "react-icons/pi";

export const SetShapes = () => {
    const [checked, setChecked] = useState<number>(0)
    const handleChecked = (num: number) => {
        setChecked(num)
    }
    return (
        <div className={s.setshapes}>
            <FaRegTrashAlt className={`${checked === 1 ? s.iconchecked : s.icon}`} onClick={() => setChecked(1)} />
            <LuStopCircle  className={`${checked === 2 ? s.iconchecked : s.icon}`} onClick={() => setChecked(2)}/>
            <PiPolygonBold  className={`${checked === 3 ? s.iconchecked : s.icon}`} onClick={() => setChecked(3)}/>
            <BsBoundingBoxCircles  className={`${checked === 4 ? s.iconchecked : s.icon}`}  onClick={() => setChecked(4)}/>
        </div>
    );
}

