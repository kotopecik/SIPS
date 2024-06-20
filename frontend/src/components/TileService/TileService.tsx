import {TileLayer} from "react-leaflet";
import {EUrls, TILE_DOMAIN} from "@/enums/EUrls";
import {ESatellite} from "@/enums/ESatellite";
import {useAppSelector} from "@/hooks/hook";
import {EComposite} from "@/enums/EComposite";

export const TileService = () => {
    const satelliteState: ESatellite = useAppSelector(state => state.tile).satellite
    const compositeState: EComposite = useAppSelector(state => state.tile).composite

    const date = useAppSelector(state => state.tile).dateTime.nondotdate
    const time = useAppSelector(state => state.tile).dateTime.time

    return (
        <>
            {date && time && compositeState && satelliteState && <TileLayer url={`${TILE_DOMAIN}/${satelliteState}/${date}/${time}/${compositeState}/${EUrls.VIIRS_TILE_ENDPOINT}`} opacity={0.7}/>}
        </>
    )
}