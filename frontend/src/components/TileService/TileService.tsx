import { TileLayer } from "react-leaflet";
import { useAppSelector } from "@/hooks/hook";

const TILE_DOMAIN = "https://gis-eng3.esemc.nsc.ru:8443/tiles";

export const TileService = () => {
    const satellite = useAppSelector(state => state.tile.satellite);
    const composite = useAppSelector(state => state.tile.composite);
    const date = useAppSelector(state => state.tile.dateTime.nondotdate);
    const time = useAppSelector(state => state.tile.dateTime.time);

    if (!satellite || !composite || !date || !time) {
        return null;
    }

    const tileUrl = `${TILE_DOMAIN}/${satellite}/${date}/${time}/${composite}/{z}/{x}/{y}.png`;

    console.log("🗺️ Tile URL:", tileUrl);

    return (
        <TileLayer 
            url={tileUrl} 
            opacity={0.75} 
            zIndex={10} 
        />
    );
};