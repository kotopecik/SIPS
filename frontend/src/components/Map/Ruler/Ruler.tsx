import React from 'react';
import s from './Ruler.module.scss'
import {useAppDispatch, useAppSelector} from "@/hooks/hook";
import {changeIsRulerActive} from "@/store/map/map-slice";

const Ruler = () => {

    const dispatch = useAppDispatch()
    const isRulerActive = useAppSelector(state => state.map).isRulerActive
    return (
        <button
            className={s.ruler}
            onClick={() => dispatch(changeIsRulerActive())}
        >
            {isRulerActive ? "Ruler" : "X"}
        </button>
    );
};

export default Ruler;