import { useState } from "react";
import s from "./Settings.module.scss";

import LayerSwitch from "./LayerSwitch/LayerSwitch";
import AdditionalInformation from "./AdditionalInformation/AdditionalInformation";
import Satelite from "./Satelite";
import Calendar from "@/components/Calendar";
import Composites from "./Composites";

import { useAppSelector } from "@/hooks/hook";

const Settings = () => {

  const [layerOpen, setLayerOpen] = useState(true);
  const [additionalOpen, setAdditionalOpen] = useState(true);
  const [satelliteOpen, setSatelliteOpen] = useState(true);
  const [dateOpen, setDateOpen] = useState(true);
  const [compositesOpen, setCompositesOpen] = useState(true);

  const satellite = useAppSelector(state => state.tile.satellite);
  const selectedDate = useAppSelector(state => state.tile.dateTime.nondotdate);

  return (

    <div className={s.sidebar}>

      <div className={s.title}>Фильтры</div>

      <div className={s.scroll}>

        {/* Выбор слоя */}

        <div className={s.filterBlock}>

          <div
            className={s.filterHeader}
            onClick={() => setLayerOpen(!layerOpen)}
          >
            <span>Выбор слоя</span>
            <span className={s.filterArrow}>
              {layerOpen ? "▾" : "▸"}
            </span>
          </div>

          {layerOpen && <LayerSwitch />}

        </div>


        {/* Дополнительные данные */}

        <div className={s.filterBlock}>

          <div
            className={s.filterHeader}
            onClick={() => setAdditionalOpen(!additionalOpen)}
          >
            <span>Дополнительные данные</span>
            <span className={s.filterArrow}>
              {additionalOpen ? "▾" : "▸"}
            </span>
          </div>

          {additionalOpen && <AdditionalInformation />}

        </div>


        {/* Спутники */}

        <div className={s.filterBlock}>

          <div
            className={s.filterHeader}
            onClick={() => setSatelliteOpen(!satelliteOpen)}
          >
            <span>Спутниковые снимки</span>
            <span className={s.filterArrow}>
              {satelliteOpen ? "▾" : "▸"}
            </span>
          </div>

          {satelliteOpen && <Satelite />}

        </div>


        {/* Дата */}

        <div className={s.filterBlock}>

          <div
            className={s.filterHeader}
            onClick={() => setDateOpen(!dateOpen)}
          >
            <span>Дата</span>
            <span className={s.filterArrow}>
              {dateOpen ? "▾" : "▸"}
            </span>
          </div>

          {dateOpen && <Calendar />}

        </div>


        {/* Композиты */}

        {satellite && selectedDate && (

          <div className={s.filterBlock}>

            <div
              className={s.filterHeader}
              onClick={() => setCompositesOpen(!compositesOpen)}
            >
              <span>Композиты</span>
              <span className={s.filterArrow}>
                {compositesOpen ? "▾" : "▸"}
              </span>
            </div>

            {compositesOpen && <Composites />}

          </div>

        )}

      </div>

    </div>

  );

};

export default Settings;