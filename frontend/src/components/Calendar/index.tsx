import React, {useState} from 'react';
import s from './Calendar.module.scss'
import {useAppDispatch, useAppSelector} from "@/hooks/hook";
import {ICalendar} from "@/interfaces/ICalendar";
import {
  decrementCurrentMonth,
  decrementCurrentYear, incrementCurrentMonth,
  incrementCurrentYear,
  setDotDate, setNonDotDate, setTime
} from "@/store/tile/tile-slice";
import {
  convertNumber,
  days, getMarksByDate,
  getStringDate,
  isThereDataForThisDay,
  months
} from "@/utils/calendar"
import {AiFillCaretLeft, AiFillCaretRight} from "react-icons/ai";
import {BsCalendar2MinusFill} from "react-icons/bs";
import TimeLine from "@/components/Calendar/TimeLine/TimeLine";
import {Dayjs} from "dayjs";
import {IDate} from "@/interfaces/IDate";
import {useMap} from "react-leaflet";
import {disableMapDragging, enableMapDragging} from "@/utils/mapdragging";
import {fetchTimes} from "@/store/tile/tile-actions";

const Calendar = () => {

  const currentDate = useAppSelector(state => state.tile).currentDate
  const [selectDate, setSelectDate] = useState<Dayjs>(currentDate);
  const [isOpenCalendar, setIsOpenCalendar] = useState<boolean>(false)
  const [isOpenTimeLine, setIsOpenTimeLine] = useState<boolean>(false)
  const calendar:ICalendar[] = useAppSelector(state => state.tile).calendar
  const dispatch = useAppDispatch()

  const handleOpenCalendar = () => {
    setIsOpenCalendar(!isOpenCalendar)
    if(isOpenCalendar){
      setIsOpenTimeLine(false)
    }
  }

  const nondotdates: string[] = useAppSelector(state => state.tile).nondotdates
  const dotdate: string[] = useAppSelector(state => state.tile).dateTime.dotdate
  const map = useMap()

  const handleNextMonth = () => {
    dispatch(incrementCurrentMonth())
  }
  const handlePrevMonth = () => {
    dispatch(decrementCurrentMonth())
  }
  const handleNextYear = () => {
    dispatch(incrementCurrentYear())
  }
  const handlePrevYear = () => {
    dispatch(decrementCurrentYear())
  }

  const handleMouseDown = () => {
    disableMapDragging(map)
  }
  const handleMouseUp = () => {
    enableMapDragging(map)
  }
  return (
      <div
          onMouseDown={handleMouseDown}
          onMouseUp={handleMouseUp}
          className={s.block}
      >
        {isOpenTimeLine && <TimeLine selectDate = {selectDate}/>}
        <BsCalendar2MinusFill className={s.calendarbtn} onClick={handleOpenCalendar}/>
        {isOpenCalendar && <div className={s.calendar}>

          <div className={s.header}>

            <div className={s.btns}>
              <AiFillCaretLeft onClick={handlePrevMonth} />
              <span>{months[currentDate.month()]}</span>
              <AiFillCaretRight  onClick={handleNextMonth} />
            </div>

            <div className={s.btns}>
              <AiFillCaretLeft onClick={handlePrevYear} />
              <span>{currentDate.year()}</span>
              <AiFillCaretRight onClick={handleNextYear} />
            </div>

          </div>

          <div className={s.days}>
            {days.map((day, index) => (
                    <h1 key={index} className={s.day}>
                      {day}
                    </h1>
                )
            )}
          </div>
          <div className={s.days}>
            {calendar.map(
                ({ date, currentMonth, today }, index) => (
                    <div key={index} className={s.calendarday}>
                      <h3 className={`
                            ${!currentMonth && s.notthatmonth} 
                            ${selectDate.toDate().toDateString() === date.toDate().toDateString() && s.selecteddate}
                            ${isThereDataForThisDay(getStringDate(date), nondotdates) && s.daygreen}
                            ${s.normalday}`}
                          onClick={() => {
                            setSelectDate(date);
                            setIsOpenTimeLine(true);
                            dispatch(setNonDotDate(getStringDate(date)));
                            dispatch(fetchTimes(date.year() + "-" + convertNumber(String(Number(currentDate.month()) + 1)) + "-" + convertNumber(String(date.date()))));
                          }}>
                        {date.date()}
                      </h3>
                    </div>
                )
            )}
          </div>
        </div>}
      </div>


  );
};

export default Calendar;
