import React from 'react';
import s from './TimeLine.module.scss';
import { Dayjs } from 'dayjs';
import {
  getMarksWithEqualIntervals,
  getMaxValue,
  getMinValue,
  months,
} from '@/utils/calendar';
import { Box } from '@mui/system';
import Slider from '@mui/material/Slider';
import { useAppDispatch, useAppSelector } from '@/hooks/hook';
import { Mark } from '@mui/base';
import { setTime } from '@/store/tile/tile-slice';

interface Props {
  selectDate: Dayjs;
}

const TimeLine = ({ selectDate }: Props) => {
  // Убрана бесполезная и ошибочная строка
  // const dates = useAppSelector(state => state.tile).dates;

  const times: Mark[] = useAppSelector(state => state.tile.times);
  const dispatch = useAppDispatch();

  const handleSliderChange = (event: Event, newValue: number | number[]) => {
    const marks = getMarksWithEqualIntervals(times);
    const foundMark = marks.find((el: Mark) => el.value === (newValue as number));
    const newTime = foundMark?.label?.toString().replace(':', '') ?? '';
    dispatch(setTime(newTime));
  };

  const marksLength = getMarksWithEqualIntervals(times).length;

  return (
    <div className={s.timeline}>
      <span>{selectDate.date()}</span>
      <span>{months[selectDate.month()]}</span>
      <span>{selectDate.year()}</span>

      <Box
        className={s.box}
        sx={{
          width: 370,
          overflow: marksLength > 8 ? 'auto' : 'hidden',
          padding: '0 20px 20px 20px',
        }}
      >
        <Slider
          style={{ width: marksLength > 8 ? `${marksLength * 60}px` : '100%' }} // чуть улучшил расчёт ширины
          min={getMinValue(times)}
          max={getMaxValue(times)}
          step={null}
          marks={times}
          onChange={handleSliderChange}
        />
      </Box>
    </div>
  );
};

export default TimeLine;