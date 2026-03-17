import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";
import s from "./Settings.module.scss";

import React from "react";

import { useAppDispatch, useAppSelector } from "@/hooks/hook";

import { setSatellite } from "@/store/tile/tile-slice";

import { ISatelliteResponse } from "@/interfaces/ISatelliteResponse";
import { ESatellite } from "@/enums/ESatellite";

const Satelite = () => {

  const dispatch = useAppDispatch();

  const satelliteState: ESatellite =
    useAppSelector(state => state.tile).satellite;

  const satellites: ISatelliteResponse[] =
    useAppSelector(state => state.tile).satellites || [];

  const satelliteHandleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setSatellite(e.target.value));
  };

  return (
    <>
      <p className={s.text}>Спутниковые снимки</p>

      {satellites.map((satellite: ISatelliteResponse) => (

        <FormControlLabel
          key={satellite.id}
          control={
            <Switch
              id={String(satellite.id)}
              size="small"
              color="secondary"
              value={satellite.tag}
              checked={satelliteState === satellite.tag}
              onChange={satelliteHandleChange}
            />
          }
          label={satellite.name}
        />

      ))}
    </>
  );
};

export default Satelite;