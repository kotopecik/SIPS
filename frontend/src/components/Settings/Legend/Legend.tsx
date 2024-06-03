import React from 'react';
import s from './Legend.module.scss'
import {getLegendByComposite} from "@/utils/composite";

interface Props{
    composite: string
}

export const Legend = ({composite}: Props) => {
    return (


        <img className={s.legend} src={getLegendByComposite(composite)} alt={'legend'}/>
    );
}
