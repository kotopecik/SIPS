import {IBorder} from "@/interfaces/IBorder";
import {ERegions} from "@/enums/ERegions";

export const borders: IBorder[] = [
    {
        id: "0",
        name: "Границы регионов",
        url: ERegions.REGIONS,
        color: "error",
        checked: false
    },
    {
        id: "1",
        name: "Заповедники",
        url: ERegions.NATURE_RESERVES,
        color: "success",
        checked: false
    },
    {
        id: "2",
        name: "Населенные пункты",
        url: ERegions.CITY,
        color: "primary",
        checked: false
    },
]