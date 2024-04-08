import {ESatellite} from "@/enums/ESatellite";
import {ICalendar} from "@/interfaces/ICalendar";
import dayjs from "dayjs";
import {IDate} from "@/interfaces/IDate";

export interface TileState {
    dateTime:{
        date: string,
        time: string,
    },
    satellite: ESatellite,
    chanelComposition: string,
    expansion: string,
    calendar: ICalendar[],
    currentDate: dayjs.Dayjs,
    dates: IDate[]
}