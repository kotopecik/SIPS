import React, {useState} from 'react';
import s from './LeftBar.module.scss'
import Calendar from "@/components/Calendar";
import {FaSearch} from "react-icons/fa";
import {IoMdDownload} from "react-icons/io";
import {catalogitems} from "@/data/catalogitem";
import {CatalogItem} from "@/components/Pages/Catalog/LeftBar/CatalogItem/CatalogItem";
import { CiSettings } from "react-icons/ci";
import { CiCalendar } from "react-icons/ci";
import { SettingsLeft } from './settings/SettingsLeft';
import { CalendarLeft } from './calendar/CalendarLeft';
import { useAppDispatch, useAppSelector } from '@/hooks/hook';

export const LeftBar = () => {


    const dispatch = useAppDispatch();
    const sattelite : string = useAppSelector(state => state.catalog).sattelite
    const composite : string = useAppSelector(state => state.catalog).composite
    const start_day : string = useAppSelector(state => state.catalog).start_day
    const end_day : string = useAppSelector(state => state.catalog).end_day

    const [selectAllChecked, setSelectAllChecked] = useState<boolean>(false)
    const handleSelectAllChecked = () => {
        setSelectAllChecked(!selectAllChecked);
    };

    const [isSetOpen, setIsSetOpen] = useState<boolean>(false)
    const handleOpenSett = () => {
        console.log(isSetOpen)
        setIsSetOpen(!isSetOpen)
    }

    const [isCaleOpen, setIsCaleOpen] = useState<boolean>(false)
    const handleOpenCale = () => {
        setIsCaleOpen(!isCaleOpen)
    }
    return (
        <div className={s.leftbar}>
            <div className={s.btns}>
                <button onClick = {handleOpenSett}><CiSettings className={s.headerbtn}/></button>
                <button onClick = {handleOpenCale} ><CiCalendar className={s.headerbtn} /></button>
                <button className={s.searchbtn}>Поиск<FaSearch /></button>
            </div>
            
            {isSetOpen && <SettingsLeft/>}
            {isCaleOpen && <CalendarLeft/>}
            <div className={s.setttab}>{sattelite} | {composite} | {start_day} - {end_day}</div>
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
            {catalogitems.map((catalogitem => (
                <CatalogItem
                    key={catalogitem.id}
                    catalogitem={catalogitem}
                    selectAllChecked={selectAllChecked}
                    setSelectAllChecked={setSelectAllChecked}
                />
            )))}
        
        </div>
    );
}