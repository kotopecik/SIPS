import { settings } from '@/data/settings'
import s from './SettingsLeft.module.scss'
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { useAppDispatch } from '@/hooks/hook';
import { useState } from 'react';
import { setCompositeS, setSatelliteS } from '@/store/catalog/catalog-slice';


export const SettingsLeft = () => {

    const dispatch = useAppDispatch();


    const handleChange = (e) => {
        console.log(e.target.name)
        if(e.target.name === '1'){
            dispatch(setCompositeS(e.target.value))
        }else if(e.target.name === '0'){
            dispatch(setSatelliteS(e.target.value))
        }
    }


    return (
        <div className={s.settingsleft}>
            {settings.map((sett) => (
                <div className={s.setting}>
                    <p>{sett.name}</p>
                    <Box sx={{ minWidth: 120 }}>
                        <FormControl fullWidth>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                onChange={handleChange}
                                name={sett.type.toString()}
                            >
                                {sett.setting.map((el) => (
                                    <MenuItem value={el.value}>{el.label}</MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </Box>
                </div>
            ))}
            
        </div>
    )
}