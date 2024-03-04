import React, {useEffect, useState} from 'react';
import {useMap} from "react-leaflet";
import Cities from "@/components/Map/Settlements/Cities/Cities";
import Towns from "@/components/Map/Settlements/Towns/Towns";




export default React.memo(function Settlements(){


    const [zoom, setZoom] = useState<number>(4);
    const map = useMap();

    useEffect(() => {
        const handleZoomEnd = () => {
            setZoom(map.getZoom());
        };

        map.on("zoomend", handleZoomEnd);

        return () => {
            map.off("zoomend", handleZoomEnd);
        };
    }, [map]);

    //cities, towns,

    return (
        <>
            {zoom < 6 ? <Cities /> : <Towns/>}
        </>
    );
})