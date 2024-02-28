import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";
import s from "./Settings.module.scss";

const Satelite = () => {
  return (
    <>
      <p className={s.text}>Спутниковые снимки</p>
      <FormControlLabel
        control={<Switch size="small" color="secondary" />}
        label="Suoimi NPP"
      />
      <FormControlLabel
        control={<Switch size="small" color="secondary" />}
        label="NOAA-20"
      />
    </>
  );
};

export default Satelite;
