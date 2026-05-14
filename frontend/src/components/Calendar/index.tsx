import { useEffect, useMemo, useState } from "react";
import s from "./Calendar.module.scss";
import {
  setDotDate,
  setNonDotDate,
  setTime,
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
import dayjs, { Dayjs } from "dayjs";

type CalendarView = "days" | "months" | "years";

const Calendar = () => {
  const dispatch = useAppDispatch();

  const nondotdates: string[] =
    useAppSelector((state) => state.tile.nondotdates) || [];

  const [currentDate, setCurrentDate] = useState<Dayjs>(dayjs("2023-06-20"));
  const [selectedDate, setSelectedDate] = useState<Dayjs>(dayjs("2023-06-20"));
  const [view, setView] = useState<CalendarView>("days");

  useEffect(() => {
    dispatch(fetchDates(""));
  }, [dispatch]);

  const calendarDays = useMemo(() => {
    const startOfMonth = currentDate.startOf("month");
    const startOffset = (startOfMonth.day() + 6) % 7;
    const gridStart = startOfMonth.subtract(startOffset, "day");

    return Array.from({ length: 42 }, (_, index) => gridStart.add(index, "day"));
  }, [currentDate]);

  const years = useMemo(() => {
    const startYear = currentDate.year() - 5;

    return Array.from({ length: 12 }, (_, index) => startYear + index);
  }, [currentDate]);

  const handleDayClick = (date: Dayjs) => {
    setSelectedDate(date);
    setCurrentDate(date);
    setView("days");

    const stringDate = getStringDate(date);
    const formattedDate = date.format("YYYY-MM-DD");

    dispatch(setNonDotDate(stringDate));
    dispatch(setDotDate(formattedDate));

    // В примерах сервера рабочее время было 0720
    dispatch(setTime("0720"));

    if (isThereDataForThisDay(stringDate, nondotdates)) {
      dispatch(fetchTimes(formattedDate));
    } else {
      dispatch(removeTimes());
    }
  };

  const goPrevMonth = () => {
    setCurrentDate((date) => date.subtract(1, "month"));
    setView("days");
  };

  const goNextMonth = () => {
    setCurrentDate((date) => date.add(1, "month"));
    setView("days");
  };

  const selectMonth = (monthIndex: number) => {
    setCurrentDate((date) => date.month(monthIndex));
    setView("days");
  };

  const selectYear = (year: number) => {
    setCurrentDate((date) => date.year(year));
    setView("months");
  };

  return (
    <div className={s.block}>
      <div className={s.calendar}>
        <div className={s.header}>
          <button className={s.navBtn} type="button" onClick={goPrevMonth}>
            ‹
          </button>

          <div className={s.currentInfo}>
            <button
              type="button"
              className={s.monthButton}
              onClick={() => setView(view === "months" ? "days" : "months")}
            >
              {months[currentDate.month()]}
            </button>

            <button
              type="button"
              className={s.yearButton}
              onClick={() => setView(view === "years" ? "days" : "years")}
            >
              {currentDate.year()}
            </button>
          </div>

          <button className={s.navBtn} type="button" onClick={goNextMonth}>
            ›
          </button>
        </div>

        {view === "months" && (
          <div className={s.monthPicker}>
            {months.map((month, index) => (
              <button
                key={month}
                type="button"
                className={
                  currentDate.month() === index
                    ? s.monthItemActive
                    : s.monthItem
                }
                onClick={() => selectMonth(index)}
              >
                {month.slice(0, 3)}
              </button>
            ))}
          </div>
        )}

        {view === "years" && (
          <div className={s.yearPicker}>
            {years.map((year) => (
              <button
                key={year}
                type="button"
                className={
                  currentDate.year() === year ? s.yearItemActive : s.yearItem
                }
                onClick={() => selectYear(year)}
              >
                {year}
              </button>
            ))}
          </div>
        )}

        {view === "days" && (
          <>
            <div className={s.days}>
              {days.map((day) => (
                <div key={day} className={s.day}>
                  {day}
                </div>
              ))}
            </div>

            <div className={s.grid}>
              {calendarDays.map((date) => {
                const stringDate = getStringDate(date);
                const hasData = isThereDataForThisDay(stringDate, nondotdates);
                const isSelected = selectedDate.isSame(date, "day");
                const isCurrentMonth = date.month() === currentDate.month();

                return (
                  <button
                    key={date.format("YYYY-MM-DD")}
                    type="button"
                    className={[
                      s.normalday,
                      hasData ? s.daygreen : "",
                      isSelected ? s.selecteddate : "",
                      !isCurrentMonth ? s.notthatmonth : "",
                    ]
                      .filter(Boolean)
                      .join(" ")}
                    onClick={() => handleDayClick(date)}
                  >
                    {date.date()}
                  </button>
                );
              })}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Calendar;