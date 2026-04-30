import React, { useState, useEffect } from "react";
import s from "./Calendar.module.scss";
import {
  setDotDate,
  setNonDotDate,
  removeTimes,
} from "@/store/tile/tile-slice";
import { useAppDispatch, useAppSelector } from "@/hooks/hook";
import {
  days,
  months,
  isThereDataForThisDay,
  getStringDate,
} from "@/utils/calendar";
import { fetchTimes, fetchDates } from "@/store/tile/tile-actions";
import dayjs from "dayjs";
import { Dayjs } from "dayjs";

const Calendar = () => {
  const dispatch = useAppDispatch();

  const nondotdates: string[] = useAppSelector((state) => state.tile.nondotdates) || [];

  const [selectDate, setSelectDate] = useState<Dayjs>(dayjs('2023-06-20'));

  // Загружаем даты
  useEffect(() => {
    dispatch(fetchDates());
  }, [dispatch]);

  // Отладка
  useEffect(() => {
    console.log("=== КАЛЕНДАРЬ ОТЛАДКА ===");
    console.log("nondotdates.length:", nondotdates.length);
    console.log("Пример дат:", nondotdates.slice(0, 5));
  }, [nondotdates]);

  // Генерируем дни июня 2023
  const calendar = Array.from({ length: 30 }, (_, i) => ({
    date: dayjs(`2023-06-${i + 1}`),
  }));

  const handleDayClick = (date: Dayjs) => {
    setSelectDate(date);
    const stringDate = getStringDate(date);
    const formattedDate = date.format("YYYY-MM-DD");

    dispatch(setNonDotDate(stringDate));
    dispatch(setDotDate(formattedDate));

    if (isThereDataForThisDay(stringDate, nondotdates)) {
      dispatch(fetchTimes(formattedDate));
    } else {
      dispatch(removeTimes());
    }
  };

  return (
    <div className={s.block}>
      <div className={s.calendar}>
        <div className={s.header}>
          <div className={s.btns}>
            <span>Июнь</span>
          </div>
          <div className={s.btns}>
            <span>2023</span>
          </div>
        </div>

        <div className={s.days}>
          {days.map((day, i) => (
            <h1 key={i} className={s.day}>{day}</h1>
          ))}
        </div>

        <div className={s.days}>
          {calendar.map(({ date }, index) => {
            const stringDate = getStringDate(date);
            const hasData = isThereDataForThisDay(stringDate, nondotdates);

            return (
              <div key={index} className={s.calendarday}>
                <h3
                  className={`
                    ${selectDate.isSame(date, "day") ? s.selecteddate : ""}
                    ${hasData ? s.daygreen : ""}
                    ${s.normalday}
                  `}
                  onClick={() => handleDayClick(date)}
                >
                  {date.date()}
                </h3>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Calendar;