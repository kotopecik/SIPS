import styles from "./Settings.module.scss";
import { useState } from "react";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import DatePicker, { DateObject } from "react-multi-date-picker";
import DatePanel from "react-multi-date-picker/plugins/date_panel";
import { DemoItem } from "@mui/x-date-pickers/internals/demo";
//import transition from "react-element-popper/animations/transition";
const DataCollection = () => {
  const [dateRange, setDateRange] = useState();
  return (
    <div className={styles.sort}>
      <p className={styles.text}>
        Сбор данных за несколько дней(не более 14 дней):
      </p>
      {/* <p className={styles.text}>Укажите начальный и конечный день:</p> */}
      <DemoItem label="Укажите начальный и конечный день:">
        <DatePicker
          value={dateRange}
          minDate={new DateObject().subtract(15, "days")}
          maxDate={new DateObject()}
          //onChange={setDateRange}
          plugins={[<DatePanel />]}
          rangeHover
        />
      </DemoItem>

      <Stack direction="row" spacing={0.5}>
        <Button color="secondary" variant="contained" size="small" href="!#">
          Сохранить
        </Button>
        <Button color="secondary" variant="contained" size="small" href="!#">
          Сбросить
        </Button>
      </Stack>
    </div>
  );
};

export default DataCollection;
