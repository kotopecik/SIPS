import {ESatellite} from "@/enums/ESatellite";
import {ICalendar} from "@/interfaces/ICalendar";
import dayjs from "dayjs";
import {IDate} from "@/interfaces/IDate";
import {IDateTime} from "@/interfaces/IDateTime";
import {EComposite} from "@/enums/EComposite";
import {Mark} from "@mui/base";
import {ISatelliteResponse} from "@/interfaces/ISatelliteResponse";

export interface TileState {
    dateTime: IDateTime
    satellite: ESatellite,
    composite: EComposite,
    chanelComposition: string,
    expansion: string,
    calendar: ICalendar[],
    currentDate: dayjs.Dayjs,
    times: Mark[],
    dotdates: string[],
    nondotdates: string[]
    satellites: ISatelliteResponse[]
}
