import { useState } from "react";
import styles from "./Settings.module.scss";
import { IoSettingsSharp } from "react-icons/io5";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
const Settings = () => {
  const [isOpen, setOpen] = useState(false);
  return (
    <>
      <div className={styles.block}>
        <IoSettingsSharp className={styles.block__icon} onClick={() => setOpen(!isOpen)}/>
      </div>
      <div className={`${styles.sett} ${isOpen ? styles.active : ""}`}>
        <FormGroup sx={{ padding: 1 }}>
          <p className={styles.text}>Отображение дополнительный данных</p>
          <FormControlLabel
            control={<Switch color="secondary" />}
            label="Границы регионов"
          />
          <FormControlLabel
            control={<Switch color="secondary" />}
            label="Заповедники"
          />
          <FormControlLabel
            control={<Switch color="secondary" />}
            label="Населенные пункты"
          />
          <p className={styles.text}>Спутниковые снимки</p>
          <FormControlLabel
            control={<Switch color="secondary" />}
            label="Suoimi NPP"
          />
          <FormControlLabel
            control={<Switch color="secondary" />}
            label="NOAA-20"
          />
        </FormGroup>
      </div>
      <div className={`${styles.sort} ${isOpen ? styles.active : ""}`}>
        <p className={styles.text}>Сортировать данные за:</p>
        <Stack direction="row" spacing={0.5} padding={0.5}>
          <Button color="secondary" variant="contained" size="small" href="!#">
            Сегодня
          </Button>
          <Button color="secondary" variant="contained" size="small" href="!#">
            24 часа
          </Button>
          <Button color="secondary" variant="contained" size="small" href="!#">
            Неделя
          </Button>
        </Stack>
      </div>
    </>
  );
};
export default Settings;
