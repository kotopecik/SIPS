import {LayersControl, TileLayer} from "react-leaflet";
import {layers} from "@/components/Map/LayersPanel/layers";

export const LayersPanel = () => {
    return(
        <LayersControl position="topright">
                {layers.map((layer, index) => (
                        <LayersControl.BaseLayer key = {index} name={layer.name} checked={index === 0}>
                            <TileLayer url={layer.url} />
                        </LayersControl.BaseLayer>
                ))}
        </LayersControl>
    )
}