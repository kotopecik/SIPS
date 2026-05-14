import React from 'react';
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";
import s from '../Settings.module.scss'
import {useAppDispatch, useAppSelector} from "@/hooks/hook";
import {fetchRegions} from "@/store/map/map-actions";
import {IRegion} from "@/interfaces/IRegion";
import {changeChecked, refreshRegions} from "@/store/map/map-slice";
import {LatLngExpression} from "leaflet";
import {IBorder} from "@/interfaces/IBorder";
import {ISettlement} from "@/interfaces/ISettlement";
import {EUrls} from "@/enums/EUrls";

const AdditionalInformation = () => {

    const regions:IRegion[] = useAppSelector(state => state.map).polygons.regions
    const natureReserves:LatLngExpression[][] = useAppSelector(state => state.map).polygons.natureReserves
    const settlements:ISettlement[] = useAppSelector(state => state.map).polygons.settlements
    const borders:IBorder[] = useAppSelector(state => state.map).borders

    const dispatch = useAppDispatch()

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        dispatch(changeChecked(Number(e.target.id)))
        switch (e.target.value){
            case EUrls.REGIONS_URL:{
                regions.length === 0 ? dispatch(fetchRegions((e.target as HTMLInputElement).value)) :  dispatch(refreshRegions(e.target.value))
                break
            }
            case EUrls.NATURE_RESERVES_URL:{
                natureReserves.length === 0 ? dispatch(fetchRegions((e.target as HTMLInputElement).value)) :  dispatch(refreshRegions(e.target.value))
                break
            }
            case EUrls.SETTLEMENTS_URL:{
                settlements.length === 0 ? dispatch(fetchRegions((e.target as HTMLInputElement).value)) :  dispatch(refreshRegions(e.target.value))
            }
        }

    }

    return (
        <>
            <p className={s.text}>Дополнительные данные</p>
            {borders.map((border) => (
                    <FormControlLabel
                        key = {border.id}
                        control={
                        <Switch
                            id={border.id}
                            size="small"
                            value={border.url}
                            color={border.color}
                            onChange={handleChange}
                            checked={border.checked}
                        />
                    }
                        label={border.name}
                    />
            ))}
        </>
    );
};

export default AdditionalInformation;
