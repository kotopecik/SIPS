import React from 'react';
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";
import s from '../Settings.module.scss'
import {labels} from './labels'
const AdditionalInformation = () => {
    return (
        <>
            <p className={s.text}>Отображение дополнительных данных</p>

            {labels.map((label, index) => (
                <FormControlLabel
                    key = {index}
                    control={<Switch color="secondary" />}
                    label={label}
                />
            ))}
        </>
    );
};

export default AdditionalInformation;