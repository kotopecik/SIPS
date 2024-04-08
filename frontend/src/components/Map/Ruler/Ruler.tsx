import React from 'react';
import s from './Ruler.module.scss'
import {useAppDispatch, useAppSelector} from "@/hooks/hook";
import {changeIsRulerActive, removeRulerMarkers} from "@/store/ruler/ruler-slice";
import {changeCursorActive} from "@/store/cursor/cursor-slice";
import {disableMapDragging, enableMapDragging} from "@/store/map/map-slice";
import {FaRulerHorizontal} from "react-icons/fa";
import {ImCross} from "react-icons/im";
import {AiOutlineClear} from "react-icons/ai";



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
            {rulerMarkers.length !== 0 &&
                <AiOutlineClear
                    className={s.btn}
                    onClick={removeMarkers}
                />
            }
            {!isRulerActive ?
                <FaRulerHorizontal
                    className={s.btn}
                    onClick={changeRulerActive}
                />
                :
                <ImCross className={s.btn} onClick={changeRulerActive}/>
            }


        </div>
    );
};

export default Ruler;