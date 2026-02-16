import React, { useState } from 'react';
import s from './Calendar.module.scss';
import { useAppDispatch, useAppSelector } from '@/hooks/hook';
import { ICalendar } from '@/interfaces/ICalendar';
import {
  decrementCurrentMonth,
  decrementCurrentYear,
  incrementCurrentMonth,
  incrementCurrentYear,
  removeTimes,
  setDotDate,
  setNonDotDate,
} from '@/store/tile/tile-slice';
import {
  convertNumber,
  days,
  getStringDate,
  isThereDataForThisDay,
  months,
} from '@/utils/calendar';
import { AiFillCaretLeft, AiFillCaretRight } from 'react-icons/ai';
import { BsCalendar2MinusFill } from 'react-icons/bs';
import TimeLine from '@/components/Calendar/TimeLine/TimeLine';
import { Dayjs } from 'dayjs';
import { useMap } from 'react-leaflet';
import { disableMapDragging, enableMapDragging } from '@/utils/mapdragging';
import { fetchTimes } from '@/store/tile/tile-actions';

const Calendar = () => {
  const dispatch = useAppDispatch();
  const map = useMap();

  const currentDate = useAppSelector((state) => state.tile.currentDate);
  const calendar: ICalendar[] = useAppSelector((state) => state.tile.calendar);
  const nondotdates: string[] = useAppSelector((state) => state.tile.nondotdates);

  const [selectDate, setSelectDate] = useState<Dayjs>(currentDate);
  const [isOpenCalendar, setIsOpenCalendar] = useState<boolean>(false);
  const [isOpenTimeLine, setIsOpenTimeLine] = useState<boolean>(false);

  const handleOpenCalendar = () => {
    setIsOpenCalendar((prev) => !prev);
    if (isOpenCalendar) setIsOpenTimeLine(false);
  };

  const handleMouseDown = () => disableMapDragging(map);
  const handleMouseUp = () => enableMapDragging(map);

  return (
    <div onMouseDown={handleMouseDown} onMouseUp={handleMouseUp} className={s.block}>
      {isOpenTimeLine && <TimeLine selectDate={selectDate} />}

      <BsCalendar2MinusFill
        className={location.pathname === '/' ? s.calendarbtnbot : s.calendarbtntop}
        onClick={handleOpenCalendar}
      />

      {isOpenCalendar && (
        <div className={s.calendar}>
          <div className={s.header}>
            <div className={s.btns}>
              <AiFillCaretLeft onClick={() => dispatch(decrementCurrentMonth())} />
              <span>{months[currentDate.month()]}</span>
              <AiFillCaretRight onClick={() => dispatch(incrementCurrentMonth())} />
            </div>

            <div className={s.btns}>
              <AiFillCaretLeft onClick={() => dispatch(decrementCurrentYear())} />
              <span>{currentDate.year()}</span>
              <AiFillCaretRight onClick={() => dispatch(incrementCurrentYear())} />
            </div>
          </div>

          <div className={s.days}>
            {days.map((day, i) => (
              <h1 key={i} className={s.day}>
                {day}
              </h1>
            ))}
          </div>

          <div className={s.days}>
            {calendar.map(({ date, currentMonth }, index) => {
              const year = date.year();
              const month = currentDate.month() + 1; // 0-based → human month
              const day = date.date();

              const formattedDate = `${year}-${convertNumber(String(month))}-${convertNumber(String(day))}`;
              const stringDate = getStringDate(date);
              const hasData = isThereDataForThisDay(stringDate, nondotdates);

              return (
                <div key={index} className={s.calendarday}>
                  <h3
                    className={`
                      ${!currentMonth ? s.notthatmonth : ''}
                      ${selectDate.isSame(date, 'day') ? s.selecteddate : ''}
                      ${hasData ? s.daygreen : ''}
                      ${s.normalday}
                    `}
                    onClick={() => {
                      setSelectDate(date);
                      setIsOpenTimeLine(true);

                      dispatch(setNonDotDate(stringDate));
                      // ← ИСПРАВЛЕНИЕ ОШИБКИ TS2322
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
      )}
    </div>
  );
};

export default Calendar;