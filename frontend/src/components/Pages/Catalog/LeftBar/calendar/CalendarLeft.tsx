import s from './CalendarLeft.module.scss'
import Box from '@mui/material/Box';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { convert, convertDates } from '@/utils/calendar';
import { useAppDispatch, useAppSelector } from '@/hooks/hook';
import { setEndDayS, setStartDayS } from '@/store/catalog/catalog-slice';
import { useState } from 'react';



export const CalendarLeft = () => {

    const dates : string[] = useAppSelector(state => state.tile).dotdates
    const [start, setStart] = useState<string>(convertDates(dates)[0].normal);
    const [end, setEnd] = useState<string>(convertDates(dates)[convertDates(dates).length - 1].normal);

    const dispatch = useAppDispatch();
    const handleStart = (e) => {
        dispatch(setStartDayS(e.target.value))
        setStart(e.target.value)
    }


    const handleEnd = (e) => {
        dispatch(setEndDayS(e.target.value))
        setEnd(e.target.value)
    }

    return(
        <div className={s.calendarleft}>
            <div className={s.setting}>
                    <p>start_day</p>
                    <Box sx={{ minWidth: 120 }}>
                        <FormControl fullWidth>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                onChange={handleStart}
                                value={start}
                            >
                                {convertDates(dates).map((el) => (
                                    
                                   
                                    <MenuItem value={el.reverse}>{el.normal}</MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </Box>
            </div>   
            <div className={s.setting}>
                    <p>end_day</p>
                    <Box sx={{ minWidth: 120 }}>
                        <FormControl fullWidth>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                onChange={handleEnd}
                            >
                                {convertDates(dates).map((el) => (
                                   
                                    <MenuItem value={el.reverse}>{el.normal}</MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </Box>
            </div>       
        </div>
    )
}