import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";
import s from "./Settings.module.scss";
import {satellites} from "@/data/satellites";
import React from "react";
import {useAppDispatch, useAppSelector} from "@/hooks/hook";
import {setSatellite} from "@/store/tile/tile-slice";
import {ISatellite} from "@/interfaces/ISatellite";
import {ESatellite} from "@/enums/ESatellite";

const Satelite = () => {

    const testComposites = ['vlst', 'aot550', 'vscmo', 'vievi', 'clmsk', 'vindvi','clmsk2', 'aotaps', 'frmsk']

    const dispatch = useAppDispatch()
    const satelliteState: ESatellite = useAppSelector(state => state.tile).satellite
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        dispatch(setSatellite(e.target.value))
    }

    return (
    <>
      <p className={s.text}>Спутниковые снимки</p>
      {satellites.map((satellite:ISatellite) => (
          <FormControlLabel
              key = {satellite.id}
              control={
              <Switch
                  id={satellite.id}
                  size="small"
                  color="secondary"
                  value={satellite.value}
                  checked = {satellite.value == satelliteState}
                  onChange={handleChange}
              />
          }
              label={satellite.label}
          />
      ))}
        <p className={s.text}>Композиты</p>
        {testComposites.map((item, index) => (
            <FormControlLabel
                key = {index}
                control={
                    <Switch
                        id={'index'}
                        size="small"
                        color="secondary"
                        value={item}
                        checked = {satelliteState == item}
                        onChange={handleChange}
                    />
                }
                label={item}
            />
        ))}
    </>
  );
};

export default Satelite;
