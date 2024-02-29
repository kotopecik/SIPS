import { useState } from "react";
import styles from "./Settings.module.scss";
import { IoSettingsSharp } from "react-icons/io5";
import FormGroup from "@mui/material/FormGroup";
import AdditionalInformation from "@/components/Settings/AdditionalInformation/AdditionalInformation";
import Satelite from "@/components/Settings/Satelite";
import SortPanel from "@/components/Settings/SortPanel";
import LayerSwitch from "@/components/Settings/LayerSwitch/LayerSwitch";
import DataCollection from "./DataCollection";
const Settings = () => {
  const [isOpen, setOpen] = useState(false);
  const handleClick = () => {
      setOpen(!isOpen)
      console.log(isOpen)
  }
  return (
    <>
      <div className={styles.block}>
        <IoSettingsSharp className={styles.block__icon} onClick={handleClick}/>
      </div>
        {isOpen && <div className={`${styles.sett} ${styles.active}`}>
            <FormGroup sx={{ padding: 1 }}>
                <LayerSwitch />
                <AdditionalInformation />
                <Satelite />
                <SortPanel/>
                <DataCollection/>
            </FormGroup>
        </div>}


    </>
  );
};
export default Settings;
