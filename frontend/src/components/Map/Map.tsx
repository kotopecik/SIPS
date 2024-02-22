import './Map.scss'
import {MapContainer, TileLayer, Marker, Popup, Polygon, GeoJSON, Polyline, Tooltip} from "react-leaflet";
import {Icon, LatLngExpression, LatLngLiteral} from "leaflet";
import {useAppDispatch, useAppSelector} from "@/hooks/hook";
import {IRegion} from "@/interfaces/IRegion";
import Coords from "@/components/Map/Coords/Coords";
import Settings from "@/components/Settings";
import Calendar from "@/components/Calendar";
import {IMarker} from "@/interfaces/IMarker";
import {useState} from "react";
import Ruler from "@/components/Map/Ruler/Ruler";
import {RulerCalculations} from "@/utils/RulerCalculations";
import {icons} from "@/data/Icons";

//спасибо центру за это
const CENTR:LatLngExpression = [54.84643545576913, 83.05183410644533];





const Map = () => {

  const purpleOptions = { color: 'red' }

  const layer:string = useAppSelector(state => state.map).layer
  const regions:IRegion[] = useAppSelector(state => state.map).regions
  const isRulerActive = useAppSelector(state => state.map).isRulerActive
  const mousePos:LatLngLiteral = useAppSelector(state => state.map).mousePos

  const [markers, setMarkers] = useState<IMarker[]>([])
  const [markersPos, setMarkersPos] = useState<LatLngExpression[]>([])


    const addMarker = (event) => {
      if((event.clientY < window.window.innerHeight - 200) || (event.clientX > 150))
      {
          setMarkers([
              ...markers,
              {
                  position: mousePos,
                  title: ""
              }
          ])
          setMarkersPos([
              ...markersPos,
              [
                  mousePos.lat,
                  mousePos.lng,
              ]
          ])
          console.log(markersPos)
      }

    }

    return (
      <div
        onClick={isRulerActive ? addMarker: null}
      >
          <MapContainer center={CENTR} zoom={13} scrollWheelZoom={true}>
              <TileLayer
                  url={layer}
              />

              {markers.map((marker, index) => (
                  <Marker key = {index} position = {marker.position} icon = {icons().rulerIcon}>
                      <Popup>{marker.position.lat + "\n" + marker.position.lng}</Popup>
                  </Marker>
              ))}

              {RulerCalculations.itterateLatLng(markersPos).map((marker) => (
                  <Marker position = {marker.pos} icon = {icons().emptyIcon}>
                      <Tooltip permanent>{marker.title}</Tooltip>
                  </Marker>
              ))}

              <Polyline pathOptions={purpleOptions} positions={markersPos}>

              </Polyline>
              {regions.map((region, index) => (
                  <Polygon key = {index} pathOptions={purpleOptions} positions={region.polygons}><Popup>{region.name}</Popup></Polygon>
              ))}

              <Coords />
              <Settings />
              <Calendar />
              <Ruler />

          </MapContainer>
      </div>

  );
}
export default Map
