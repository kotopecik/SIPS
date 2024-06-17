import s from './CalendarLeft.module.scss'
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { convertDates } from '@/utils/calendar';
import { useAppDispatch, useAppSelector } from '@/hooks/hook';
import { elGR } from '@mui/x-date-pickers';
import { setEndDayS, setStartDayS } from '@/store/catalog/catalog-slice';



export const CalendarLeft = () => {

    const dates : string[] = useAppSelector(state => state.tile).dotdates
    const dispatch = useAppDispatch();

    const handleStart = (e) => {
        dispatch(setStartDayS(e.target.value))
    }


    const handleEnd = (e) => {
        dispatch(setEndDayS(e.target.value))
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