import React, {useState} from 'react';
import s from './LeftBar.module.scss'
import Calendar from "@/components/Calendar";
import {FaSearch} from "react-icons/fa";
import {IoMdDownload} from "react-icons/io";
import {catalogitems} from "@/data/catalogitem";
import {CatalogItem} from "@/components/Pages/Catalog/LeftBar/CatalogItem/CatalogItem";

export const LeftBar = () => {
    const [selectAllChecked, setSelectAllChecked] = useState<boolean>(false)
    const handleSelectAllChecked = () => {
        setSelectAllChecked(!selectAllChecked);
    };
    return (
        <div className={s.leftbar}>

            <button className={s.searchbtn}>Поиск<FaSearch /></button>

            <div className={s.setttab}>suomi-npp | viirs | 06.03.2019 - 06.03.2019</div>
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