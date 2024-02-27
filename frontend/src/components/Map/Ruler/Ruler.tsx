import React from 'react';
import s from './Ruler.module.scss'
import {useAppDispatch, useAppSelector} from "@/hooks/hook";
import {changeIsRulerActive, removeRulerMarkers} from "@/store/map/map-slice";



const Ruler = () => {

    const handleClick = () => {
        dispatch(removeRulerMarkers())
    }

    const dispatch = useAppDispatch()
    const isRulerActive = useAppSelector(state => state.map).isRulerActive
    const rulerMarkers = useAppSelector(state => state.map).rulerMarkers
    return (
        <div className={s.ruler}>
            <button
                className={s.btn}
                onClick={() => dispatch(changeIsRulerActive())}
            >
                {!isRulerActive ? "Ruler" : "X"}
            </button>
            {rulerMarkers.length !== 0 &&
                <button
                    className={s.btn}
                    onClick={handleClick}
                >clear
                </button>}
        </div>
    );
};

export default Ruler;