import './Map.scss'
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import {Icon, LatLngExpression} from "leaflet";
import {useAppSelector} from "@/hooks/hook";


const position:LatLngExpression = [54.84643545576913, 83.05183410644533];

const customIcon = new Icon({
  iconUrl: require("../../assets/img/marker-icon.png"),
  iconSize: [60, 60]
});




const Map = () => {
  const layer = useAppSelector(state => state.map).layer

  return (
      <MapContainer center={position} zoom={13} scrollWheelZoom={true}>
        <TileLayer
            url={layer}
        />
        <Marker position={position} icon={customIcon}>
          <Popup>Higher College of Informatics</Popup>
        </Marker>
      </MapContainer>
  );
}
export default Map
