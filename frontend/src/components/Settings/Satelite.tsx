import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";
import s from "./Settings.module.scss";
import { useState } from "react";
import { useAppDispatch, useAppSelector } from "@/hooks/hook";
import { setComposite, setSatellite } from "@/store/tile/tile-slice";
import { ESatellite } from "@/enums/ESatellite";
import { EComposite } from "@/enums/EComposite";
import { ISatelliteResponse } from "@/interfaces/ISatelliteResponse";

const compositeDescriptions: Record<string, string> = {
  aot550:
    "Оптическая толщина аэрозоля на длине волны 550 нм. Используется для оценки загрязнения воздуха и анализа дымовых шлейфов.",
  aotaps:
    "Оптическая толщина аэрозоля, рассчитанная алгоритмом APS с учетом поляризации.",
  clphs:
    "Фазовое состояние облаков: жидкая, ледяная или смешанная фаза.",
  clmsk:
    "Маска облаков. Помогает определить облачные области на снимке.",
  clmsk2:
    "Улучшенная версия маски облаков с дополнительными признаками.",
  frmsk:
    "Маска пожаров. Используется для выявления активных очагов возгорания.",
  vievi:
    "Индекс растительности EVI. Показывает состояние и плотность растительности.",
  vindvi:
    "Индекс NDVI. Используется для оценки наличия растительной массы.",
  vlst:
    "Температура поверхности Земли с учетом данных растительности.",
  vscmo:
    "Снежный покров за месяц. Помогает оценивать устойчивые зоны снега.",
};

const Satelite = () => {
  const dispatch = useAppDispatch();

  const satelliteState: ESatellite = useAppSelector((state) => state.tile).satellite;
  const compositeState: EComposite = useAppSelector((state) => state.tile).composite;

  const satellitesFromStore: ISatelliteResponse[] =
    useAppSelector((state) => state.tile).satellites || [];

  const satellites: ISatelliteResponse[] =
    satellitesFromStore.length > 0
      ? satellitesFromStore
      : [
          { id: 1, name: "Suomi NPP", tag: ESatellite.SUOMI_NPP },
          { id: 2, name: "NOAA-20", tag: ESatellite.NOAA_20 },
        ];

  const composites: string[] = useAppSelector((state) => state.tile).composites || [];

  const [hoveredComposite, setHoveredComposite] = useState<string | null>(null);

  const satelliteHandleChange = (value: string) => {
    dispatch(setSatellite(value as ESatellite));
  };

  const compositeHandleChange = (value: string) => {
    dispatch(setComposite(value as EComposite));
  };

  return (
    <>
      <div className={s.satelliteList}>
        {satellites.map((satellite) => (
          <FormControlLabel
            key={satellite.id}
            control={
              <Switch
                checked={satelliteState === satellite.tag}
                onChange={() => satelliteHandleChange(satellite.tag)}
              />
            }
            label={satellite.name}
          />
        ))}
      </div>

      {composites.length > 0 ? (
        <>
          <div className={s.compositeTitle}>Композиты</div>

          <div className={s.compositesGrid}>
            {composites.map((composite) => (
              <div
                key={composite}
                className={s.compositeWrapper}
                onMouseEnter={() => setHoveredComposite(composite)}
                onMouseLeave={() => setHoveredComposite(null)}
              >
                <FormControlLabel
                  control={
                    <Switch
                      checked={compositeState === composite}
                      onChange={() => compositeHandleChange(composite)}
                    />
                  }
                  label={composite}
                />
              </div>
            ))}
          </div>

          {hoveredComposite && (
            <div className={s.compositeHint}>
              <div className={s.compositeHintTitle}>{hoveredComposite}</div>
              <div>{compositeDescriptions[hoveredComposite] || hoveredComposite}</div>
            </div>
          )}
        </>
      ) : (
        <div className={s.emptyText}>Композиты пока не загружены</div>
      )}
    </>
  );
};

export default Satelite;