import { useState } from "react";
import type { MouseEvent, WheelEvent } from "react";
import s from "./Settings.module.scss";
import LayerSwitch from "./LayerSwitch/LayerSwitch";
import AdditionalInformation from "./AdditionalInformation/AdditionalInformation";
import Satelite from "./Satelite";
import Calendar from "@/components/Calendar";
import DownloadSelectedProduct from "@/components/Settings/DownloadSelectedProduct/DownloadSelectedProduct";

const Settings = () => {
  const [isPanelOpen, setIsPanelOpen] = useState(true);

  const [layerOpen, setLayerOpen] = useState(true);
  const [additionalOpen, setAdditionalOpen] = useState(true);
  const [satelliteOpen, setSatelliteOpen] = useState(true);
  const [dateOpen, setDateOpen] = useState(true);

  const stopMapWheel = (event: WheelEvent<HTMLDivElement>) => {
    event.stopPropagation();
  };

  const stopMapClick = (event: MouseEvent<HTMLDivElement>) => {
    event.stopPropagation();
  };

  if (!isPanelOpen) {
    return (
      <div
        className={s.hiddenPanel}
        onWheel={stopMapWheel}
        onWheelCapture={stopMapWheel}
        onMouseDown={stopMapClick}
        onClick={stopMapClick}
      >
        <button
          className={s.openPanelButton}
          type="button"
          onClick={() => setIsPanelOpen(true)}
        >
          Фильтры ›
        </button>
      </div>
    );
  }

  return (
    <div
      className={s.sidebar}
      onWheel={stopMapWheel}
      onWheelCapture={stopMapWheel}
      onMouseDown={stopMapClick}
      onClick={stopMapClick}
    >
      <div className={s.topLine}>
        <h2 className={s.title}>Фильтры</h2>

        <button
          className={s.hideButton}
          type="button"
          onClick={() => setIsPanelOpen(false)}
          title="Скрыть панель"
        >
          ‹
        </button>
      </div>

      <div className={s.scroll}>
        <div className={s.filterBlock}>
          <div
            className={s.filterHeader}
            onClick={() => setLayerOpen(!layerOpen)}
          >
            <span>Выбор слоя</span>
            <span className={s.filterArrow}>{layerOpen ? "▾" : "▸"}</span>
          </div>

          {layerOpen && (
            <div className={s.filterContent}>
              <LayerSwitch />
            </div>
          )}
        </div>

        <div className={s.filterBlock}>
          <div
            className={s.filterHeader}
            onClick={() => setAdditionalOpen(!additionalOpen)}
          >
            <span>Дополнительные данные</span>
            <span className={s.filterArrow}>{additionalOpen ? "▾" : "▸"}</span>
          </div>

          {additionalOpen && (
            <div className={s.filterContent}>
              <AdditionalInformation />
            </div>
          )}
        </div>

        <div className={s.filterBlock}>
          <div
            className={s.filterHeader}
            onClick={() => setSatelliteOpen(!satelliteOpen)}
          >
            <span>Спутниковые снимки</span>
            <span className={s.filterArrow}>{satelliteOpen ? "▾" : "▸"}</span>
          </div>

          {satelliteOpen && (
            <div className={s.filterContent}>
              <Satelite />
            </div>
          )}
        </div>

        <div className={s.filterBlock}>
          <div
            className={s.filterHeader}
            onClick={() => setDateOpen(!dateOpen)}
          >
            <span>Дата</span>
            <span className={s.filterArrow}>{dateOpen ? "▾" : "▸"}</span>
          </div>

          {dateOpen && (
            <div className={s.calendarWrapper}>
              <Calendar />
              <DownloadSelectedProduct />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Settings;