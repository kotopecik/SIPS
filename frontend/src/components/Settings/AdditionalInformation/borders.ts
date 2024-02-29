import {IBorder} from "@/interfaces/IBorder";
import {ERegions} from "@/enums/ERegions";

export const borders: IBorder[] = [
    {
        name: "Границы регионов",
        url: ERegions.REGIONS,
        color: "error"
    },
    {
        name: "Заповедники",
        url: ERegions.NATURE_RESERVES,
        color: "success"
    },
    {
        name: "Населенные пункты",
        url: ERegions.EMPTY,
        color: "primary"
    },
]