import React, {useEffect, useState} from 'react';
import s from './CatalogItem.module.scss'
import {ICatalogItem} from "@/interfaces/ICatalogItem";

interface Props{
    catalogitem: ICatalogItem,
    selectAllChecked: boolean;
    setSelectAllChecked: React.Dispatch<React.SetStateAction<boolean>>;
}

export const CatalogItem = ({ catalogitem, selectAllChecked, setSelectAllChecked }: Props) => {
    const [checked, setChecked] = useState<boolean>(false)

    useEffect(() => {
        setChecked(selectAllChecked);
    }, [selectAllChecked]);

    const handleChecked = () => {
        setChecked(!checked)
    }

    useEffect(() => {
        setSelectAllChecked(prev => prev && checked);
    }, [checked]);
    return (
        <div
            className={s.cataloogitem}
            onClick={handleChecked}
        >
            <div className={s.cataloogitemleft}>
                <div className={s.dates}>Дата:<span>{catalogitem.dates}</span></div>
                <div className={s.satellite}>Спутник:<span>{catalogitem.satellite}</span></div>
                <div className={s.radiometer}>Радиометер:<span>{catalogitem.radiometer}</span></div>
            </div>
            <input type={"checkbox"} checked={checked} onChange={() => {}}/>

        </div>
    );
};

