import { TileLayer } from "react-leaflet";
import { EUrls, TILE_DOMAIN } from "@/enums/EUrls";
import { useAppSelector } from "@/hooks/hook";

export const TileService = () => {
  const satellite = useAppSelector((state) => state.tile.satellite);
  const composite = useAppSelector((state) => state.tile.composite);
  const date = useAppSelector((state) => state.tile.dateTime.nondotdate);
  const time = useAppSelector((state) => state.tile.dateTime.time);

  if (!satellite || !composite || !date || !time) {
    return null;
  }

  const tileUrl = `${TILE_DOMAIN}/${satellite}/${date}/${time}/${composite}/${EUrls.VIIRS_TILE_ENDPOINT}`;

  return (
    <TileLayer
      key={`${satellite}-${date}-${time}-${composite}`}
      url={tileUrl}
      opacity={0.75}
      zIndex={10}
      maxNativeZoom={3}
      maxZoom={13}
    />
  );
};