import React, {useEffect, useState} from 'react';
import s from './LeftBar.module.scss'
import {FaSearch} from "react-icons/fa";
import {IoMdDownload} from "react-icons/io";
import {CatalogItem} from "@/components/Pages/Catalog/LeftBar/CatalogItem/CatalogItem";
import { CiSettings } from "react-icons/ci";
import { CiCalendar } from "react-icons/ci";
import { SettingsLeft } from './settings/SettingsLeft';
import { CalendarLeft } from './calendar/CalendarLeft';
import { useAppDispatch, useAppSelector } from '@/hooks/hook';
import { convert, convertDates } from '@/utils/calendar';
import { IImage } from '@/interfaces/IImage';
import { fetchCatalogItems, fetchCatalogTimes } from '@/store/catalog/catalog-actions';
import { IImages } from '@/interfaces/IImages';
import { checkAuth } from '@/store/user/user-actions';
import { unwrapResult } from '@reduxjs/toolkit';
import { AppDispatch } from '@/store';

export const LeftBar = () => {


    const dispatch = useAppDispatch();
    const sattelite : string = useAppSelector(state => state.catalog).sattelite
    const composite : string = useAppSelector(state => state.catalog).composite
    const start_day : string = useAppSelector(state => state.catalog).start_day
    const end_day : string = useAppSelector(state => state.catalog).end_day
    const dates : string [] = useAppSelector(state => state.tile).dotdates
    
    const catalogItems : IImage[] = useAppSelector(state => state.catalog).catalogItems
    const imagesObj : IImages = useAppSelector(state => state.catalog).imagesObj
    const i : IImage[] = useAppSelector(state => state.catalog).images


    const [selectAllChecked, setSelectAllChecked] = useState<boolean>(false)
    const handleSelectAllChecked = () => {
        setSelectAllChecked(!selectAllChecked);
    };

    const [isSetOpen, setIsSetOpen] = useState<boolean>(false)
    const handleOpenSett = () => {
        setIsSetOpen(!isSetOpen)
    }

    const [isCaleOpen, setIsCaleOpen] = useState<boolean>(false)
    const handleOpenCale = () => {
        setIsCaleOpen(!isCaleOpen)
    }



    const handleSearch = async() => {
        const filteredDates = dates.filter((el) => {
            const convertedElValue = convert(el).value;
            return convertedElValue >= convert(start_day).value && convertedElValue <= convert(end_day).value;
        });

        dispatch(fetchCatalogTimes(filteredDates))
        dispatch(fetchCatalogItems(i))
    }

    const handleFind = () => {
        dispatch(fetchCatalogItems(i))
    }

    return (
        <div className={s.leftbar}>
            <div className={s.btns}>
                <button onClick = {handleOpenSett}><CiSettings className={s.headerbtn}/></button>
                <button onClick = {handleOpenCale} ><CiCalendar className={s.headerbtn} /></button>
                <button className={s.searchbtn} onClick={() => {
                    handleSearch()
                    handleFind()
                    }
                }>Поиск<FaSearch /></button>
                <button onClick = {handleFind}>find</button>
            </div>
            
            {isSetOpen && <SettingsLeft/>}
            {isCaleOpen && <CalendarLeft/>}

            <div className={s.setttab}>{sattelite && sattelite + ' | ' }  {composite && composite + ' | '} {(start_day && end_day) && start_day + ' - ' + end_day}</div>
            <div className={s.btnstab}>
                <button className={s.sortbtn}> сортировать</button>
                <div className={s.choseallbtn}  onClick={handleSelectAllChecked}>
                    <span> выбрать все</span>
                    <input type={"checkbox"} checked={selectAllChecked}/>
                </div>

                <button className={s.downloadbtn}><IoMdDownload /></button>
            </div>

            <div className={s.catalogitems}>


            </div>
             {imagesObj.images.map((catalogitem => (
                <CatalogItem key={catalogitem.uid} catalogitem={catalogitem} />
            )))} 
        
        </div>
    );
}