import React, {useEffect, useState} from 'react';
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";
import s from '../Settings.module.scss'
import {borders} from './borders'
import axios from "axios";
import {useAppDispatch, useAppSelector} from "@/hooks/hook";
import {fetchRegions} from "@/store/map/map-actions";
import {IRegion} from "@/interfaces/IRegion";
import {refreshRegions} from "@/store/map/map-slice";
const AdditionalInformation = () => {
    const regions:IRegion[] = useAppSelector(state => state.map).regions

    const dispatch = useAppDispatch()

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        regions.length === 0 ? dispatch(fetchRegions((e.target as HTMLInputElement).value)) :  dispatch(refreshRegions())
    }

    return (
        <>
            <p className={s.text}>Отображение дополнительных данных</p>
            {borders.map((border, index) => (
                    <FormControlLabel
                        key = {index}
                        control={
                        <Switch
                            value={border.url}
                            color="secondary"
                            onChange={handleChange}

                        />}
                        label={border.name}
                    />

            ))}
        </>
    );
};

export default AdditionalInformation;