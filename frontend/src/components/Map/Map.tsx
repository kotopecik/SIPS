import './Map.scss'
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import {Icon, LatLngExpression} from "leaflet";

const position:LatLngExpression = [54.84643545576913, 83.05183410644533];

const customIcon = new Icon({
  iconUrl: require("../../assets/img/icon.png"),
  iconSize: [38, 38]
});

const Map = () => {
  return (
    <>
      <MapContainer center={position} zoom={13} scrollWheelZoom={true}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={position} icon={customIcon}>
          <Popup>Higher College of Informatics</Popup>
        </Marker>
      </MapContainer>
    </>
  );
}
export default Map
