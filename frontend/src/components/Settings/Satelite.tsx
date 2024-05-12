import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";
import s from "./Settings.module.scss";
import {satellites} from "@/data/satellites";
import {Composites} from "@/data/composites";
import React from "react";
import {useAppDispatch, useAppSelector} from "@/hooks/hook";
import {setComposite, setSatellite} from "@/store/tile/tile-slice";
import {ISatellite} from "@/interfaces/ISatellite";
import {ESatellite} from "@/enums/ESatellite";
import {EComposite} from "@/enums/EComposite";
import legend from '../../assets/png/legend.png'
import {ISatelliteResponse} from "@/interfaces/ISatelliteResponse";
import {fetchComposites} from "@/store/tile/tile-actions";

const Satelite = () => {

    const dispatch = useAppDispatch()
    const satelliteState: ESatellite = useAppSelector(state => state.tile).satellite
    const compositeState: EComposite = useAppSelector(state => state.tile).composite
    const satellites: ISatelliteResponse[] = useAppSelector(state => state.tile).satellites
    const composites:string[] = useAppSelector(state => state.tile).composites


    const compositeHandleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        dispatch(setComposite(e.target.value))
    }
    const satelliteHandleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        dispatch(setSatellite(e.target.value))
    }

    return (
    <>
      <p className={s.text}>Спутниковые снимки</p>
      {satellites.map((satellite:ISatelliteResponse) => (
          <FormControlLabel
              key = {satellite.id}
              control={
              <Switch
                  id={String(satellite.id)}
                  size="small"
                  color="secondary"
                  value={satellite.tag}
                  checked = {satelliteState == satellite.tag}
                  onChange={satelliteHandleChange}
              />
          }
              label={satellite.name}
          />
      ))}
        {composites && <div className={s.composites_block}>
            <div className={s.text}>Композиты</div>
            <div className={s.composites}>
                {composites?.map((composite, index) => (
                    <FormControlLabel
                        key = {index}
                        control={
                            <Switch
                                id={index.toString()}
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
            {composites.length !== 0 && <img className={s.legend} src={legend} alt={'legend'}/>}
        </div>
        }
    </>
  );
};

export default Satelite;
