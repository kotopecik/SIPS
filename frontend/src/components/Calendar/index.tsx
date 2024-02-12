import { useState } from "react";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { Box } from "@mui/system";
import { FaCalendarAlt } from "react-icons/fa";
import styles from "./Calendar.module.scss";
export default function Calendar() {
  const [isOpen, setOpen] = useState(false);
  return (
    <>
      <div className={styles.block}>
        <FaCalendarAlt
          className={styles.block__icon}
          onClick={() => setOpen(!isOpen)}
        />
      </div>
      <Box className={`${styles.box} ${isOpen ? styles.active : ""}`}>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker />
        </LocalizationProvider>
      </Box>
    </>
  );
}
