import React from 'react';
import {FormLabel, Radio, RadioGroup} from "@mui/material";
import FormControlLabel from "@mui/material/FormControlLabel";
import {FormControl} from "@mui/base";
import s from "@/components/Settings/Settings.module.scss";
import {layers} from "@/components/Settings/LayerSwitch/layers";
import {useAppDispatch, useAppSelector} from "@/hooks/hook";
import {setLayer} from "@/store/map/map-slice";

const LayerSwitch = () => {

    const dispatch = useAppDispatch()

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        dispatch(setLayer((e.target as HTMLInputElement).value))
    }
    const layer = useAppSelector(state => state.map).layer

    return (
        <FormControl>
            <FormLabel id="demo-radio-buttons-group-label">
                <span className={s.text}>Выбор слоя</span>
            </FormLabel>

            <RadioGroup
                aria-labelledby="demo-radio-buttons-group-label"
                defaultValue={layer}
                name="radio-buttons-group"
                onChange={handleChange}

            >
                {layers.map((layer, index) => (
                    <FormControlLabel key = {index} value={layer.url} control={<Radio />} label={layer.name} />
                ))}
            </RadioGroup>
        </FormControl>
    );
};

export default LayerSwitch;