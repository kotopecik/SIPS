import './Map.scss'
import {MapContainer, TileLayer, Marker, Popup, Polygon, Polyline, Tooltip} from "react-leaflet";
import {LatLngExpression, LatLngLiteral} from "leaflet";
import {useAppDispatch, useAppSelector} from "@/hooks/hook";
import {IRegion} from "@/interfaces/IRegion";
import Coords from "@/components/Map/Coords/Coords";
import Settings from "@/components/Settings";
import Calendar from "@/components/Calendar";
import Ruler from "@/components/Map/Ruler/Ruler";
import {RulerCalculations} from "@/utils/RulerCalculations";
import {icons} from "@/data/Icons";
import {addRulerMarker, addRulerMarkerPos} from "@/store/ruler/ruler-slice";
import {IMarker} from "@/interfaces/IMarker";
import Cursor from "@/components/Cursor/Cursor";
import Regions from "@/components/Map/Regions/Regions";
import NatureReserves from "@/components/Map/NatureReserves/NatureReserves";

//спасибо центру за это
const CENTR:LatLngExpression = [54.84643545576913, 83.05183410644533];


const Map = () => {

  const purpleOptions = { color: 'red' }


  const rulerMarkers:IMarker[] = useAppSelector(state => state.ruler).rulerMarkers
  const rulerMarkersPos:LatLngExpression[] = useAppSelector(state => state.ruler).rulerMarkersPos
  const layer:string = useAppSelector(state => state.map).layer
  const isRulerActive:boolean = useAppSelector(state => state.ruler).isRulerActive
  const mousePos:LatLngLiteral = useAppSelector(state => state.cursor).mousePos
  const dragging:boolean = useAppSelector(state => state.map).dragging
  const isCursorActive:boolean = useAppSelector(state => state.cursor).isActive

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
          <MapContainer
              center={CENTR}
              maxZoom={15}
              zoom={4}
              minZoom={3}
              scrollWheelZoom={true}
              maxBounds={[[-110, -170], [100, 200]]}
              dragging = {dragging}
          >
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

              <Regions />
              <NatureReserves />

              <Coords />
              <Settings />
              <Calendar />
              <Ruler/>
              {isCursorActive ? <Cursor /> : ""}

          </MapContainer>
      </div>

  );
}
export default Map
