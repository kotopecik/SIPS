import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";
import s from "./Settings.module.scss";
import {satellites} from "@/data/satellites";
import {Composites} from "@/data/composites";
import React from "react";
import {useAppDispatch, useAppSelector} from "@/hooks/hook";
import {setComposite, setSatellite} from "@/store/tile/tile-slice";
import {ISatellite} from "@/interfaces/ISatellite";
import {ESatellite, EComposite} from "@/enums/ESatellite";

const Satelite = () => {

    const dispatch = useAppDispatch()
    const satelliteState: ESatellite = useAppSelector(state => state.tile).satellite
    const compositeState: EComposite = useAppSelector(state => state.tile).composite
    const satelliteHandleChange = (value) => {
        if(value == satelliteState){
            dispatch(setSatellite(null))
        }
        else {
            dispatch(setSatellite(value))
        }

    }

    const compositeHandleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        dispatch(setComposite(e.target.value))
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
                  onChange={() => satelliteHandleChange(satellite.value)}
              />
          }
              label={satellite.label}
          />
      ))}
        {satelliteState && <div className={s.composites_block}>
            <p className={s.text}>Композиты</p>
            {Composites.sort().map((composite, index) => (
                <FormControlLabel
                    className={s.composites}
                    key = {index}
                    control={
                        <Switch
                            id={'index'}
                            size="small"
                            color="secondary"
                            value={composite}
                            checked = {compositeState == composite}
                            onChange={compositeHandleChange}
                        />
                    }
                    label={composite}
                />
            ))}
        </div>
        }
    </>
  );
};

export default Satelite;
