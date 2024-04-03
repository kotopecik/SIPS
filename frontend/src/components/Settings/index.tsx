import { useState, useEffect, useRef } from "react";
import styles from "./Settings.module.scss";
import { IoSettingsSharp } from "react-icons/io5";
import FormGroup from "@mui/material/FormGroup";
import AdditionalInformation from "@/components/Settings/AdditionalInformation/AdditionalInformation";
import Satelite from "@/components/Settings/Satelite";
import SortPanel from "@/components/Settings/SortPanel";
import LayerSwitch from "@/components/Settings/LayerSwitch/LayerSwitch";
import DataCollection from "./DataCollection";
import {disableMapDragging, enableMapDragging} from "@/store/map/map-slice";
import {useAppDispatch} from "@/hooks/hook";
const Settings = () => {
  const [isOpen, setOpen] = useState(false);
  const settRef = useRef();

  const handleClick = () => {
    setOpen(!isOpen);
  };

  const dispatch = useAppDispatch()

  const handleMouseDown = () => {
    dispatch(disableMapDragging())
  }
  const handleMouseUp = () => {
    dispatch(enableMapDragging())
  }

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (!event.composedPath().includes(settRef.current)) {
        setOpen(false);
      }
    };
    document.body.addEventListener("click", handleClickOutside);
    return () => document.body.removeEventListener("click", handleClickOutside);
  }, []);
  return (
    <>
      <div ref={settRef} className={styles.block}>
        <IoSettingsSharp
            className={styles.block__icon}
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
              <SortPanel />
              <DataCollection />
            </FormGroup>
          </div>
        )}
      </div>
    </>
  );
};
export default Settings;
