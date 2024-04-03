import React, { useState,} from "react";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { Box } from "@mui/system";
import { FaCalendarAlt } from "react-icons/fa";
import styles from "./Calendar.module.scss";
import { useAppDispatch, useAppSelector } from "@/hooks/hook";
import { setDate } from "@/store/tile/tile-slice";
import {disableMapDragging, enableMapDragging} from "@/store/map/map-slice";

export default function Calendar() {
  const [isOpen, setOpen] = useState(false);
  const dispatch = useAppDispatch();
  const date = useAppSelector((state) => state.tile).dateTime.date;

  const handleDateChange = (newValue) => {
    dispatch(setDate(newValue?.format("YYYYMMDD")));
  };

  const handleMouseDown = () => {
    dispatch(disableMapDragging())
  }
  const handleMouseUp = () => {
    dispatch(enableMapDragging())
  }

 
  return (
    <>
      <div
          className={styles.block}
          onMouseDown={handleMouseDown}
          onMouseUp={handleMouseUp}
      >
        <FaCalendarAlt
          className={styles.block__icon}
          onClick={() => setOpen(!isOpen)}
        />

        <Box className={`${styles.box} ${isOpen && styles.active}`}>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker value={date} onChange={handleDateChange} />
          </LocalizationProvider>
        </Box>
      </div>
    </>
  );
}
