import React, { useState } from "react";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { Box } from "@mui/system";
import { FaCalendarAlt } from "react-icons/fa";
import styles from "./Calendar.module.scss";
import dayjs from "dayjs";
import {useAppDispatch, useAppSelector} from "@/hooks/hook";
import {setDate, setTime} from "@/store/tile/tile-slice";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";

export default function Calendar() {
  const [isOpen, setOpen] = useState(false);
  const dispatch = useAppDispatch()
  const time = useAppSelector(state => state.tile).dateTime.time
  const date = useAppSelector(state => state.tile).dateTime.date

  const handleDateChange = (newValue) => {
      dispatch(setDate(newValue?.format("YYYYMMDD")))
  }
  const handleTimeChange = (newValue) => {
      dispatch(setTime(newValue?.format("HH:mm")))
  }


    return (
    <>
      <div className={styles.block}>
        <FaCalendarAlt
          className={styles.block__icon}
          onClick={() => setOpen(!isOpen)}
        />
      </div>
      <Box className={`${styles.box} ${isOpen && styles.active}`}>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker value={date} onChange={handleDateChange}/>
          <TimePicker value={time} onChange={handleTimeChange} ampm={false} />
        </LocalizationProvider>
      </Box>

    </>
  );
}
