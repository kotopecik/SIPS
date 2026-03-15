import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";
import s from "./Settings.module.scss";
import React, { useState } from "react";
import { useAppDispatch, useAppSelector } from "@/hooks/hook";
import { setComposite, setSatellite } from "@/store/tile/tile-slice";
import { ESatellite } from "@/enums/ESatellite";
import { EComposite } from "@/enums/EComposite";
import { ISatelliteResponse } from "@/interfaces/ISatelliteResponse";
import { Legend } from "@/components/Settings/Legend/Legend";


// описания композитов
const compositeDescriptions: Record<string, string> = {
  aot550:
    "Оптическая толщина аэрозоля на длине волны 550 нм. Используется для оценки загрязнения воздуха и анализа дымовых шлейфов.",

  aotaps:
    "Оптическая толщина аэрозоля, рассчитанная алгоритмом APS с учетом поляризации рассеянного излучения.",

  clphs:
    "Определяет фазовое состояние облаков (жидкая, ледяная или смешанная) по данным инфракрасных каналов.",

  clmsk:
    "Маска облаков. Классифицирует пиксели по наличию облачности для фильтрации облачных областей.",

  clmsk2:
    "Улучшенная версия маски облаков clmsk с учетом дополнительных спектральных признаков.",

  frmsk:
    "Маска пожаров. Определяет активные очаги возгорания по аномально высокой температуре.",

  vievi:
    "Индекс растительности EVI. Улучшает оценку состояния растительности и корректирует атмосферные эффекты.",

  vindvi:
    "Индекс NDVI. Определяет наличие и плотность растительности на поверхности Земли.",

  vlst:
    "Комбинированный продукт: индекс растительности и температура поверхности Земли.",

  vscmo:
    "Композит снежного покрова, полученный из агрегированных спутниковых наблюдений за месяц."
};

const Satelite = () => {

  const dispatch = useAppDispatch();

  const satelliteState: ESatellite =
    useAppSelector(state => state.tile).satellite;

  const compositeState: EComposite =
    useAppSelector(state => state.tile).composite;

  // исправление ошибки map undefined
  const satellites: ISatelliteResponse[] =
    useAppSelector(state => state.tile).satellites || [];

  const composites: string[] =
    useAppSelector(state => state.tile).composites || [];

  const [hoveredComposite, setHoveredComposite] =
    useState<string | null>(null);


  const compositeHandleChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    dispatch(setComposite(e.target.value));
  };

  const satelliteHandleChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
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
              checked={satelliteState == satellite.tag}
              onChange={satelliteHandleChange}
            />
          }
          label={satellite.name}
        />
      ))}

      {composites.length > 0 && (

        <div className={s.composites_block}>

          <div className={s.text}>Композиты</div>

          <div className={s.composites}>

            {composites.map((composite, index) => (

              <div
                key={index}
                className={s.compositeItem}
                onMouseEnter={() => setHoveredComposite(composite)}
                onMouseLeave={() => setHoveredComposite(null)}
              >

                <FormControlLabel
                  control={
                    <Switch
                      id={index.toString()}
                      size="small"
                      color="secondary"
                      value={composite}
                      checked={compositeState == composite}
                      onChange={compositeHandleChange}
                    />
                  }
                  label={composite}
                />

                {hoveredComposite === composite && (
                  <div className={s.tooltip}>
                    {compositeDescriptions[composite]}
                  </div>
                )}

              </div>

            ))}

          </div>

          <Legend composite={compositeState} />

        </div>

      )}
    </>
  );
};

export default Satelite;