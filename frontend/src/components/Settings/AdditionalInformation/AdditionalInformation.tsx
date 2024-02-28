import React from 'react';
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";
import s from '../Settings.module.scss'
import {borders} from './borders'
import {useAppDispatch, useAppSelector} from "@/hooks/hook";
import {fetchRegions} from "@/store/map/map-actions";
import {IRegion} from "@/interfaces/IRegion";
import {refreshRegions} from "@/store/map/map-slice";
import {ERegions} from "@/enums/ERegions";
import {LatLngExpression} from "leaflet";
const AdditionalInformation = () => {
    const regions:IRegion[] = useAppSelector(state => state.map).polygons.regions
    const natureReserves:LatLngExpression[][] = useAppSelector(state => state.map).polygons.natureReserves

    const dispatch = useAppDispatch()

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        switch (e.target.value){
            case ERegions.REGIONS:{
                regions.length === 0 ? dispatch(fetchRegions((e.target as HTMLInputElement).value)) :  dispatch(refreshRegions(e.target.value))
                break
            }
            case ERegions.NATURE_RESERVES:{
                natureReserves.length === 0 ? dispatch(fetchRegions((e.target as HTMLInputElement).value)) :  dispatch(refreshRegions(e.target.value))
                break
            }
        }

    }

    return (
        <>
            <p className={s.text}>Отображение дополнительных данных</p>
            {borders.map((border, index) => (
                    <FormControlLabel
                        key = {index}
                        control={
                        <Switch
                            size="small"
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
