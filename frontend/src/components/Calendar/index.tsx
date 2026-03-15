import React, { useState } from "react";
import s from "./Calendar.module.scss";

import {
  incrementCurrentMonth,
  decrementCurrentMonth,
  incrementCurrentYear,
  decrementCurrentYear,
} from "@/store/tile/tile-slice";

import { useAppDispatch, useAppSelector } from "@/hooks/hook";

import { ICalendar } from "@/interfaces/ICalendar";

import {
  setDotDate,
  setNonDotDate,
  removeTimes,
} from "@/store/tile/tile-slice";

import {
  convertNumber,
  days,
  getStringDate,
  isThereDataForThisDay,
  months,
} from "@/utils/calendar";

import { fetchTimes } from "@/store/tile/tile-actions";

import { Dayjs } from "dayjs";

import TimeLine from "@/components/Calendar/TimeLine/TimeLine";

const Calendar = () => {
  const dispatch = useAppDispatch();

  const currentDate = useAppSelector((state) => state.tile.currentDate);

  const calendar: ICalendar[] =
    useAppSelector((state) => state.tile.calendar) || [];

  const nondotdates: string[] =
    useAppSelector((state) => state.tile.nondotdates) || [];

  const [selectDate, setSelectDate] = useState<Dayjs>(currentDate);

  const [isMonthPickerOpen, setMonthPickerOpen] = useState(false);
  const [isYearPickerOpen, setYearPickerOpen] = useState(false);

const handleMonthSelect = (monthIndex: number) => {

  const diff = monthIndex - currentDate.month();

  if (diff > 0) {
    for (let i = 0; i < diff; i++) {
      dispatch(incrementCurrentMonth());
    }
  } else {
    for (let i = 0; i < Math.abs(diff); i++) {
      dispatch(decrementCurrentMonth());
    }
  }

  setMonthPickerOpen(false);
};

const handleYearSelect = (year: number) => {

  const diff = year - currentDate.year();

  if (diff > 0) {
    for (let i = 0; i < diff; i++) {
      dispatch(incrementCurrentYear());
    }
  } else {
    for (let i = 0; i < Math.abs(diff); i++) {
      dispatch(decrementCurrentYear());
    }
  }

  setYearPickerOpen(false);
};

  return (
    <div className={s.block}>
      {/* Таймлайн временно отключен */}
      {/* <TimeLine selectDate={selectDate} /> */}

      <div className={s.calendar}>
        {/* HEADER */}

        <div className={s.header}>
          <div className={s.btns}>
            <span
              onClick={() => setMonthPickerOpen(!isMonthPickerOpen)}
              style={{ cursor: "pointer" }}
            >
              {months[currentDate.month()]}
            </span>
          </div>

          <div className={s.btns}>
            <span
              onClick={() => setYearPickerOpen(!isYearPickerOpen)}
              style={{ cursor: "pointer" }}
            >
              {currentDate.year()}
            </span>
          </div>
        </div>

        {/* MONTH PICKER */}

        {isMonthPickerOpen && (
          <div className={s.monthPicker}>
            {months.map((month, i) => (
              <div
                key={i}
                className={s.monthItem}
                onClick={() => handleMonthSelect(i)}
              >
                {month}
              </div>
            ))}
          </div>
        )}

        {/* YEAR PICKER */}

        {isYearPickerOpen && (
          <div className={s.yearPicker}>
            {Array.from({ length: 20 }, (_, i) => {
              const year = currentDate.year() - 10 + i;

              return (
                <div
                  key={year}
                  className={s.yearItem}
                  onClick={() => handleYearSelect(year)}
                >
                  {year}
                </div>
              );
            })}
          </div>
        )}

        {/* DAYS HEADER */}

        <div className={s.days}>
          {days.map((day, i) => (
            <h1 key={i} className={s.day}>
              {day}
            </h1>
          ))}
        </div>

        {/* CALENDAR GRID */}

        <div className={s.days}>
          {calendar.map(({ date, currentMonth }, index) => {
            const year = date.year();
            const month = currentDate.month() + 1;
            const day = date.date();

            const formattedDate = `${year}-${convertNumber(
              String(month)
            )}-${convertNumber(String(day))}`;

            const stringDate = getStringDate(date);

            const hasData = isThereDataForThisDay(stringDate, nondotdates);

            return (
              <div key={index} className={s.calendarday}>
                <h3
                  className={`
                    ${!currentMonth ? s.notthatmonth : ""}
                    ${selectDate.isSame(date, "day") ? s.selecteddate : ""}
                    ${hasData ? s.daygreen : ""}
                    ${s.normalday}
                  `}
                  style={{ userSelect: "none" }}
                  onClick={() => {
                    setSelectDate(date);

                    dispatch(setNonDotDate(stringDate));
                    dispatch(setDotDate([formattedDate]));

                    if (hasData) {
                      dispatch(fetchTimes(formattedDate));
                    } else {
                      dispatch(removeTimes());
                    }
                  }}
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