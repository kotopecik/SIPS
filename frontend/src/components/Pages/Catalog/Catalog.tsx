import React from 'react';
import s from './Catalog.module.scss'
import Map from "@/components/Map/Map";
import {LeftBar} from "@/components/Pages/Catalog/LeftBar/LeftBar";
import Header from "@/components/Header";

export const Catalog = () => {
    return (
        <>
            <Header/>
        <div className={s.catalog}>

            <LeftBar/>
            <Map/>
        </div>
        </>
    );
}
