import React, {useEffect, useState} from 'react';
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";
import s from '../Settings.module.scss'
import {borders} from './borders'
import axios from "axios";
import {useAppDispatch} from "@/hooks/hook";
import {fetchRegions} from "@/store/map/map-actions";
const AdditionalInformation = () => {

    const purpleOptions = { color: 'red' }
    const dispatch = useAppDispatch()

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        dispatch(fetchRegions((e.target as HTMLInputElement).value))
    }

    return (
        <>
            <p className={s.text}>Отображение дополнительных данных</p>
            {borders.map((border, index) => (
                    <FormControlLabel
                        key = {index}
                        control={<Switch
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