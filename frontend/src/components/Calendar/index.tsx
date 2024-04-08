import React, {useState} from 'react';
import s from './Calendar.module.scss'
import {useAppDispatch, useAppSelector} from "@/hooks/hook";
import {ICalendar} from "@/interfaces/ICalendar";
import {
  decrementCurrentMonth,
  decrementCurrentYear, incrementCurrentMonth,
  incrementCurrentYear,
  setCalendarMonth, setDate, setTime
} from "@/store/tile/tile-slice";
import {
  days, getMarksByDate,
  getStringDate,
  isThereDataForThisDay,
  months
} from "@/utils/calendar"
import {AiFillCaretLeft, AiFillCaretRight} from "react-icons/ai";
import {BsCalendar2MinusFill} from "react-icons/bs";
import TimeLine from "@/components/Calendar/TimeLine/TimeLine";
import {Dayjs} from "dayjs";
import {disableMapDragging, enableMapDragging} from "@/store/map/map-slice";
import {IDate} from "@/interfaces/IDate";

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

  const dates: IDate[] = useAppSelector(state => state.tile).dates

  const storedate = useAppSelector(state => state.tile).dateTime.date

  const handleNextMonth = () => {
    dispatch(setCalendarMonth({month: currentDate.month() + 1, year: currentDate.year()}))
    dispatch(incrementCurrentMonth())
  }
  const handlePrevMonth = () => {
    dispatch(setCalendarMonth({month: currentDate.month() - 1, year: currentDate.year()}))
    dispatch(decrementCurrentMonth())
  }
  const handleNextYear = () => {
    dispatch(setCalendarMonth({month: currentDate.month(), year: currentDate.year() + 1}))
    dispatch(incrementCurrentYear())
  }
  const handlePrevYear = () => {
    dispatch(setCalendarMonth({month: currentDate.month(), year: currentDate.year() - 1}))
    dispatch(decrementCurrentYear())
  }

  const handleMouseDown = () => {
    dispatch(disableMapDragging())
  }
  const handleMouseUp = () => {
    dispatch(enableMapDragging())
  }
  return (
      <div
          onMouseDown={handleMouseDown}
           onMouseUp={handleMouseUp}
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
                            ${isThereDataForThisDay(getStringDate(date), dates) && s.daygreen}
                            ${s.normalday}`}
                          onClick={() => {
                            setSelectDate(date);
                            setIsOpenTimeLine(true);
                            dispatch(setDate(getStringDate(date)));
                            try {
                              dispatch(setTime(getMarksByDate(getStringDate(date), dates)[0].value))
                            }catch (ex){
                              dispatch(setTime(""))
                            }
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