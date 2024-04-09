import {ESatellite} from "@/enums/ESatellite";
import {ICalendar} from "@/interfaces/ICalendar";
import dayjs from "dayjs";
import {IDate} from "@/interfaces/IDate";
import {IDateTime} from "@/interfaces/IDateTime";

export interface TileState {
    dateTime: IDateTime
    satellite: ESatellite,
    chanelComposition: string,
    expansion: string,
    calendar: ICalendar[],
    currentDate: dayjs.Dayjs,
    dates: IDate[]
}