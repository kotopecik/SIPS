import React, {useState} from 'react';
import s from './TimeLine.module.scss'
import { Dayjs } from "dayjs";
import {
    getMarksByDate,
    getMarksWithEqualIntervals,
    getMaxValue,
    getMinValue,
    getStringDate,
    months
} from "@/utils/calendar";
import { Box } from "@mui/system";
import Slider from '@mui/material/Slider';
import { useAppDispatch, useAppSelector } from "@/hooks/hook";
import { Mark } from "@mui/base";
import {setTime} from "@/store/tile/tile-slice";

interface Props {
    selectDate: Dayjs
}

const TimeLine = ({ selectDate }: Props) => {
    const dates = useAppSelector(state => state.tile).dates;
    const marks: Mark[] = getMarksByDate(getStringDate(selectDate), dates);
    const dispatch = useAppDispatch();
    const time: string = (useAppSelector(state => state.tile).dateTime.time).toString()
    const [sliderValue, setSliderValue] = useState<string>();


    const handleSliderChange = (event: Event, newValue: number | number[]) => {
        const newTime: string = (getMarksWithEqualIntervals(marks).find((el: Mark) => el.value === (newValue as number))?.label?.toString() ?? '').replace(":", "");
        dispatch(setTime(newTime))
        setSliderValue(newTime)
    };

    const marksLength = getMarksWithEqualIntervals(marks).length;
    const timeToDisplay = time.substring(0, time.length - 2) + ":" + time.substring(time.length - 2)


    return (
        <div className={s.timeline}>
            <span>{selectDate.date()}</span>
            <span>{months[selectDate.month()]}</span>
            <span>{selectDate.year()}</span>
            <span>{timeToDisplay !== ":" && timeToDisplay}</span>

            <Box className={s.box} sx={{ width: 370, overflow: marksLength > 8 ? 'auto' : 'hidden', padding: '0 20px 20px 20px'}}>
                <Slider
                    style={{width: marksLength > 8 && `${marksLength + 40 * marksLength}px`}}
                    min={getMinValue(marks)}
                    max={getMaxValue(marks)}
                    step={null}
                    marks={getMarksWithEqualIntervals(marks)}
                    onChange={handleSliderChange}
                />
            </Box>
        </div>
    );
};

export default TimeLine;
