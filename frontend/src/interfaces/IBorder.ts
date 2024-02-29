import {ERegions} from "@/enums/ERegions";
import {OverridableStringUnion} from "@mui/types";
import {SwitchPropsColorOverrides} from "@mui/material/Switch/Switch";

export interface IBorder{
    name: string,
    url: ERegions,
    color: OverridableStringUnion<
        'primary' | 'secondary' | 'error' | 'info' | 'success' | 'warning' | 'default',
        SwitchPropsColorOverrides
        >
}