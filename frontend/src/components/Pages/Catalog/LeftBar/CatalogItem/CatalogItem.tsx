import React, {useEffect, useState} from 'react';
import s from './CatalogItem.module.scss'
import {ICatalogItem} from "@/interfaces/ICatalogItem";
import { IImage } from '@/interfaces/IImage';
import { useAppDispatch } from '@/hooks/hook';
import { downloadImage } from '@/store/catalog/catalog-actions';

interface Props{
    catalogitem: IImage,
    //selectAllChecked: boolean;
    //setSelectAllChecked: React.Dispatch<React.SetStateAction<boolean>>;
}



export const CatalogItem = ({ catalogitem /*, selectAllChecked, setSelectAllChecked*/ }: Props) => {
    const dispatch = useAppDispatch();

    const handleDownload = (uid : string) => {
        dispatch(downloadImage(uid));
    }
    const [checked, setChecked] = useState<boolean>(false)

    // useEffect(() => {
    //     setChecked(selectAllChecked);
    // }, [selectAllChecked]);

    // const handleChecked = () => {
    //     setChecked(!checked)
    // }

    // useEffect(() => {
    //     setSelectAllChecked(prev => prev && checked);
    // }, [checked]);


    const removeT = (str : string) => {
        return str.replaceAll('T', ' ');
    }

    return (
        <div
            className={s.cataloogitem}
            //onClick={handleChecked}
        >
            <div className={s.cataloogitemleft}>
                <div className={s.dates}>Дата: <span>{removeT(catalogitem.datetime)}</span></div>
                <div className={s.satellite}>Спутник: <span>{catalogitem.satellite}</span></div>
                <div className={s.radiometer}>Композит: <span>{catalogitem.composite}</span></div>
                <button 
                    onClick={() => handleDownload(catalogitem.uid)} 
                >
                    {catalogitem.uid}
                </button>
            </div>
            <input type={"checkbox"} checked={checked} onChange={() => {}}/>

        </div>
    );
};

