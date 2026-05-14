import './Map.scss';
import { MapContainer, TileLayer } from "react-leaflet";
import { LatLngExpression, LatLngLiteral } from "leaflet";
import type { MouseEvent } from "react";

import { useAppDispatch, useAppSelector } from "@/hooks/hook";
import Coords from "@/components/Map/Coords/Coords";
import Settings from "@/components/Settings";
import Ruler from "@/components/Map/Ruler/Ruler";
import { addRulerMarker, addRulerMarkerPos } from "@/store/ruler/ruler-slice";
import Cursor from "@/components/Cursor/Cursor";
import Regions from "@/components/Map/Regions/Regions";
import NatureReserves from "@/components/Map/NatureReserves/NatureReserves";
import RulerMarkers from "@/components/Map/RulerMarkers/RulerMarkers";
import Settlements from "@/components/Map/Settlements/Settlements";
import { Loading } from "@/components/main/Loading/Loading";
import { TileService } from "@/components/TileService/TileService";
import { ESatellite } from "@/enums/ESatellite";
import { EComposite } from "@/enums/EComposite";

import { Legend } from "@/components/Settings/Legend/Legend";

// спасибо центру за это
const CENTR: LatLngExpression = [54.84643545576913, 83.05183410644533];

const OSM_LAYER = "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png";

const ESRI_LAYER =
    "https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}";

const MONOCHROME_LAYER =
    "https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png";

const getBaseLayerUrl = (layer: string | null | undefined) => {
    const currentLayer = String(layer || "").trim();
    const normalizedLayer = currentLayer.toLowerCase();

    console.log("СЛОЙ КАРТЫ ИЗ REDUX:", currentLayer);

    // Если в Redux уже лежит готовая ссылка на тайлы
    if (
        normalizedLayer.startsWith("http") ||
        normalizedLayer.includes("{z}") ||
        normalizedLayer.includes("{x}") ||
        normalizedLayer.includes("{y}")
    ) {
        console.log("Использую layer как готовый URL:", currentLayer);
        return currentLayer;
    }

    // Esri / спутниковая подложка
    if (
        normalizedLayer.includes("esri") ||
        normalizedLayer.includes("arcgis") ||
        normalizedLayer.includes("satellite") ||
        normalizedLayer.includes("спутник")
    ) {
        console.log("Выбран ESRI layer");
        return ESRI_LAYER;
    }

    // Монохромная карта
    if (
        normalizedLayer.includes("mono") ||
        normalizedLayer.includes("monochrome") ||
        normalizedLayer.includes("gray") ||
        normalizedLayer.includes("grey") ||
        normalizedLayer.includes("light") ||
        normalizedLayer.includes("моно") ||
        normalizedLayer.includes("сер")
    ) {
        console.log("Выбран MONOCHROME layer");
        return MONOCHROME_LAYER;
    }

    // Стандартная карта
    console.log("Выбран STANDARD / OSM layer");
    return OSM_LAYER;
};

const Map = () => {
    const layer: string = useAppSelector(state => state.map).layer;

    const isRulerActive: boolean = useAppSelector(state => state.ruler).isRulerActive;
    const mousePos: LatLngLiteral = useAppSelector(state => state.cursor).mousePos;
    const isCursorActive: boolean = useAppSelector(state => state.cursor).isActive;

    const isRegions: boolean = useAppSelector(state => state.map).isRegions;
    const isNatureReserves: boolean = useAppSelector(state => state.map).isNatureReserves;
    const isSettlements: boolean = useAppSelector(state => state.map).isSettlements;
    const isLoading: boolean = useAppSelector(state => state.map).isLoading;

    const satelliteState: ESatellite = useAppSelector(state => state.tile).satellite;
    const compositeState: EComposite = useAppSelector(state => state.tile).composite;
    const date = useAppSelector(state => state.tile).dateTime.nondotdate;
    const time = useAppSelector(state => state.tile).dateTime.time;

    const dispatch = useAppDispatch();

    const baseLayerUrl = getBaseLayerUrl(layer);

    const addMarker = (event: MouseEvent<HTMLDivElement>) => {
        if (
            event.clientY < window.innerHeight - 68 ||
            event.clientX < window.innerWidth - 116
        ) {
            dispatch(addRulerMarker({ position: mousePos, title: "" }));
            dispatch(addRulerMarkerPos([mousePos.lat, mousePos.lng]));
        }
    };

    return (
        <>
            {isLoading ? (
                <Loading />
            ) : (
                <div className="mapPage" onClick={isRulerActive ? addMarker : undefined}>
                    <MapContainer
                    className="leafletMap"
                    center={CENTR}
                    maxZoom={13}
                    zoom={2}
                    minZoom={2}
                    scrollWheelZoom={true}
                    maxBounds={[[-110, -170], [100, 200]]}
                    doubleClickZoom={false}
                    >
                        <TileLayer
                            key={`${layer}-${baseLayerUrl}`}
                            url={baseLayerUrl}
                            opacity={1}
                            zIndex={1}
                        />

                        {satelliteState != null &&
                            compositeState != null &&
                            time != null &&
                            date != null && (
                                <TileService />
                            )}

                        {isRegions && <Regions />}
                        {isNatureReserves && <NatureReserves />}
                        {isSettlements && <Settlements />}

                        <RulerMarkers />

                        <Coords />
                        <Settings />

                        {compositeState && <Legend composite={String(compositeState)} />}

                        <Ruler />

                        {isCursorActive ? <Cursor /> : ""}
                    </MapContainer>
                </div>
            )}
        </>
    );
};

export default Map;