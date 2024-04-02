import React from 'react';
import s from './Ruler.module.scss'
import {useAppDispatch, useAppSelector} from "@/hooks/hook";
import {changeIsRulerActive, removeRulerMarkers} from "@/store/ruler/ruler-slice";
import {changeCursorActive} from "@/store/cursor/cursor-slice";
import {disableMapDragging, enableMapDragging} from "@/store/map/map-slice";



const Ruler = () => {
    const dispatch = useAppDispatch()


    const changeRulerActive = () => {
        dispatch(changeIsRulerActive())
        dispatch(changeCursorActive())
    }

    const removeMarkers = () => {
        dispatch(removeRulerMarkers())
    }

    const handleMouseDown = () => {
        dispatch(disableMapDragging())
    }
    const handleMouseUp = () => {
        dispatch(enableMapDragging())
    }

    const isRulerActive = useAppSelector(state => state.ruler).isRulerActive
    const rulerMarkers = useAppSelector(state => state.ruler).rulerMarkers

    return (
        <div
            className={s.ruler}
            onMouseDown={handleMouseDown}
            onMouseUp={handleMouseUp}
        >
            <button
                className={s.btn}
                onClick={changeRulerActive}
            >
                {!isRulerActive ? "Ruler" : "X"}
            </button>
            {rulerMarkers.length !== 0 &&
                <button
                    className={s.btn}
                    onClick={removeMarkers}
                >clear
                </button>}
        </div>
    );
};

export default Ruler;