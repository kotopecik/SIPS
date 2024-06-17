import { ICatalogItem } from "@/interfaces/ICatalogItem";
import { ISatellite } from "@/interfaces/ISatellite";

export interface CatalogState{
    sattelite : string,
    composite : string,
    start_day : string,
    end_day : string
    catalogItems : ICatalogItem[]
}