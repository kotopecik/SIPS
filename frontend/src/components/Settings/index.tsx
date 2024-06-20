import { useState, useEffect, useRef } from "react";
import styles from "./Settings.module.scss";
import { IoSettingsSharp } from "react-icons/io5";
import FormGroup from "@mui/material/FormGroup";
import AdditionalInformation from "@/components/Settings/AdditionalInformation/AdditionalInformation";
import Satelite from "@/components/Settings/Satelite";
import SortPanel from "@/components/Settings/SortPanel";
import LayerSwitch from "@/components/Settings/LayerSwitch/LayerSwitch";
import DataCollection from "./DataCollection";
import {useAppDispatch} from "@/hooks/hook";
import {useMap} from "react-leaflet";
import {disableMapDragging, enableMapDragging} from "@/utils/mapdragging";
import s from "@/components/Calendar/Calendar.module.scss";

const Settings = () => {

  const [isOpen, setOpen] = useState(false);
  const settRef = useRef();

  const handleClick = () => {
    setOpen(!isOpen);
  };

  const map = useMap()

  const handleMouseDown = () => {
    disableMapDragging(map)
  }
  const handleMouseUp = () => {
    enableMapDragging(map)
  }

  /*useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (!event.composedPath().includes(settRef.current)) {
        setOpen(false);
      }
    };
    document.body.addEventListener("click", handleClickOutside);
    return () => document.body.removeEventListener("click", handleClickOutside);
  }, []);*/
  return (
    <>
      <div ref={settRef} className={styles.block}>
        <IoSettingsSharp
            className = {`${location.pathname === "/" ? styles.block__icon : styles.block__iconleft}`}
            onClick={handleClick}
            onMouseDown={handleMouseDown}
            onMouseUp={handleMouseUp}
        />

        {isOpen && (
          <div
              className={`${styles.sett} ${styles.active}`}
              onMouseDown={handleMouseDown}
              onMouseUp={handleMouseUp}
          >
            <FormGroup sx={{ padding: 1 }}>
              <LayerSwitch />
              <AdditionalInformation />
              <Satelite />
            </FormGroup>
          </div>
        )}
      </div>
    </>
  );
};
export default Settings;
