import dayjs from "dayjs"
import {ICalendar} from "@/interfaces/ICalendar";
import {IDate} from "@/interfaces/IDate";
import {Mark} from "@mui/base";
import { ISettingDates } from "@/interfaces/ISettingDates";

export const generateDate = (month:number = dayjs().month(), year:number = dayjs().year()):ICalendar[] => {
    const firstDateOfMonth = dayjs().year(year).month(month).startOf("month")
    const lastDateOfMonth = dayjs().year(year).month(month).endOf("month")

    const arrayOfDate:ICalendar[] = []

    for (let i = 1; i < firstDateOfMonth.day(); i++) {
        arrayOfDate.push({
            currentMonth: false,
            date: firstDateOfMonth.day(i),
            today: false
        });
    }

    for (let i = firstDateOfMonth.date(); i <= lastDateOfMonth.date(); i++) {
        arrayOfDate.push({
            currentMonth: true,
            date: firstDateOfMonth.date(i),
            today:
                firstDateOfMonth.date(i).toDate().toDateString() ===
                dayjs().toDate().toDateString(),
        });
    }

    const remaining = 42 - arrayOfDate.length;

    for (let i = lastDateOfMonth.date() + 1; i <= lastDateOfMonth.date() + remaining; i++) {
        arrayOfDate.push({
            currentMonth: false,
            date: lastDateOfMonth.date(i),
            today: false
        });
    }
    return arrayOfDate;
}

export const getStringDate = (date:dayjs.Dayjs):string => {
    let month: string = date.month().toString()
    let year: string = date.year().toString()
    let day: string = date.date().toString()
    if(Number(month) < 10){
        month = "0" + (Number(month) + 1)
    }
    if(Number(day) < 10){
        day = "0" + day
    }

    return year + month + day
}

export const convertNumber = (num: string): string => {
    return Number(num) < 10 ? "0"+ num : num
}



export const isThereDataForThisDay = (day: string, dateArray: string[]):boolean => {
    return dateArray.some((element: string) => element === day)
}

export const getMarksByDate = (selectedDate: string, dateArray: IDate[]):Mark[] => {
    try{
        return dateArray.find((el: IDate) => el.date === selectedDate).times
    }catch (ex){
        return null
    }

}

export const getMinValue = (marks: Mark[]):number => {
    let marksArray: number[] = []
    try{
        marks.forEach((el:Mark) => marksArray.push(el.value))
        return Math.min.apply(null, marksArray);
    }catch (ex){
        return 0
    }
}

export const getMaxValue = (marks: Mark[]):number => {
    let marksArray: number[] = []
    try{
        marks.forEach((el:Mark) => marksArray.push(el.value))
        return Math.max.apply(null, marksArray);
    }catch (ex){
        return 100
    }
}

export const getMarksWithEqualIntervals = (marks:Mark[]):Mark[] => {
    try{
        const step = (getMaxValue(marks) - getMinValue(marks)) / (marks.length - 1);
        const marksArray:Mark[] = [];
        for (let i = 0; i < marks.length; i++) {
            const value = getMinValue(marks) + step * i;
            marksArray.push({value: value, label: marks[i].label.toString()});
        }
        return marksArray;
    }catch (ex){
        return []
    }
}

export const days = ["ПН", "ВТ", "СР", "ЧТ", "ПТ", "СБ", "ВС"];

export const months = [
    "Явнварь",
    "Февраль",
    "Март",
    "Апрель",
    "Май",
    "Июнь",
    "Июль",
    "Август",
    "Сентябрь",
    "Октябрь",
    "Ноябрь",
    "Декабрь",
];


export const convertDates = (arr : string[]) : ISettingDates[] => {
    let strs : ISettingDates [] = [];

    const convert = ((el : string): {str: string, value: number} => {
        let day = el.substring(8, 10)
        let month = el.substring(5, 7)
        let year = el.substring(0, 4)
        let value = Number(day) + Number(month) * 30 + Number(year) + 365
        return {str: day + "-" + month + "-" + year , value: value}
    })
    arr.forEach((el) => {
        strs.push({reverse: el, normal : convert(el).str, value: convert(el).value})
    })

    return strs.reverse().sort(function(a, b){
        if(a.value > b.value){
            return 1;
        }
        if(a.value < b.value){
            return -1;
        }
        return 0;
    })
}