import {TileLayer} from "react-leaflet";
import {EUrls, TILE_DOMAIN} from "@/enums/EUrls";
import {ESatellite} from "@/enums/ESatellite";
import {useAppSelector} from "@/hooks/hook";
import {EComposite} from "@/enums/EComposite";

export const TileService = () => {
    const satelliteState: ESatellite = useAppSelector(state => state.tile).satellite
    const compositeState: EComposite = useAppSelector(state => state.tile).composite
    const currentDate = useAppSelector(state => state.tile).currentDate
    const currentTime = useAppSelector(state => state.tile).currentTime

    return (<>
        <TileLayer url={`${TILE_DOMAIN}/${satelliteState}/${currentDate}/${currentTime}/${compositeState}/${EUrls.VIIRS_TILE_ENDPOINT}`} opacity={0.7}/>
    </>)
}