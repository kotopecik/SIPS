import './Map.scss'
import {MapContainer, TileLayer, Marker, Popup, Polygon, GeoJSON, Polyline, Tooltip} from "react-leaflet";
import {LatLngExpression, LatLngLiteral} from "leaflet";
import {useAppDispatch, useAppSelector} from "@/hooks/hook";
import {IRegion} from "@/interfaces/IRegion";
import Coords from "@/components/Map/Coords/Coords";
import Settings from "@/components/Settings";
import Calendar from "@/components/Calendar";
import Ruler from "@/components/Map/Ruler/Ruler";
import {RulerCalculations} from "@/utils/RulerCalculations";
import {icons} from "@/data/Icons";
import {addRulerMarker, addRulerMarkerPos} from "@/store/map/map-slice";

//спасибо центру за это
const CENTR:LatLngExpression = [54.84643545576913, 83.05183410644533];


const Map = () => {

  const purpleOptions = { color: 'red' }
  const greenOptions = { color: 'green' }

  const rulerMarkers = useAppSelector(state => state.map).rulerMarkers
  const rulerMarkersPos = useAppSelector(state => state.map).rulerMarkersPos
  const layer:string = useAppSelector(state => state.map).layer
  const regions:IRegion[] = useAppSelector(state => state.map).polygons.regions
  const natureReserves:LatLngExpression[][] = useAppSelector(state => state.map).polygons.natureReserves
  const isRulerActive = useAppSelector(state => state.map).isRulerActive
  const mousePos:LatLngLiteral = useAppSelector(state => state.map).mousePos

  const dispatch = useAppDispatch()

    const addMarker = (event) => {
      if((event.clientY < window.window.innerHeight - 200) || (event.clientX > 150)) {
          dispatch(addRulerMarker({position: mousePos, title: ""}))
          dispatch(addRulerMarkerPos([mousePos.lat, mousePos.lng]))
      }
    }


    return (
      <div
        onClick={isRulerActive ? addMarker: null}
      >
          <MapContainer center={CENTR} maxZoom={15} zoom={4} minZoom={3} scrollWheelZoom={true} maxBounds={[[-110, -170], [100, 200]]}>
              <TileLayer
                  url={layer}
              />

              {rulerMarkers.map((marker, index) => (
                  <Marker key = {index} position = {marker.position} icon = {icons().rulerIcon} />
              ))}

              {RulerCalculations.iterateLatLng(rulerMarkersPos).map((marker) => (
                  <Marker position = {marker.pos} icon = {icons().emptyIcon}>
                      <Tooltip permanent>{marker.title}</Tooltip>
                  </Marker>
              ))}

              <Polyline pathOptions={purpleOptions} positions={rulerMarkersPos} />

              {regions.map((region, index) => (
                  <Polygon key = {index} pathOptions={purpleOptions} positions={region.polygons}><Popup>{region.name}</Popup></Polygon>
              ))}

              {natureReserves.map((region, index) => (
                  <Polygon key = {index} pathOptions={greenOptions} positions={region} />
              ))}


              <Coords />
              <Settings />
              <Calendar />
              <Ruler/>

          </MapContainer>
      </div>

  );
}
export default Map
