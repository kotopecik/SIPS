import React from 'react';
import s from './Catalog.module.scss'
import Map from "@/components/Map/Map";
import {LeftBar} from "@/components/Pages/Catalog/LeftBar/LeftBar";

export const Catalog = () => {
    return (
        <div className={s.catalog}>
            <LeftBar/>
            <Map/>
        </div>
    );
}
