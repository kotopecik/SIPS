import './Map.scss'
import {MapContainer, TileLayer, Marker, Popup, Polygon, GeoJSON} from "react-leaflet";
import {Icon, LatLngExpression} from "leaflet";
import {useAppSelector} from "@/hooks/hook";
import {IRegion} from "@/interfaces/IRegion";
import Coords from "@/components/Map/Coords/Coords";
import Settings from "@/components/Settings";
import Calendar from "@/components/Calendar";

const position:LatLngExpression = [54.84643545576913, 83.05183410644533];

const customIcon = new Icon({
  iconUrl: require("../../assets/img/marker-icon.png"),
  iconSize: [60, 60]
});




const Map = () => {

  const purpleOptions = { color: 'red' }
  const layer:string = useAppSelector(state => state.map).layer
  const regions:IRegion[] = useAppSelector(state => state.map).regions




  return (
      <MapContainer center={position} zoom={13} scrollWheelZoom={true}>
        <TileLayer
            url={layer}
        />
        <Marker position={position} icon={customIcon}>
          <Popup>Higher College of Informatics</Popup>
        </Marker>
          {regions.map((region, index) => (
              <Polygon key = {index} pathOptions={purpleOptions} positions={region.polygons}><Popup>{region.name}</Popup></Polygon>
          ))}
          <Coords />
          <Settings />
          <Calendar />

      </MapContainer>
  );
}
export default Map
