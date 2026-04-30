import './Map.scss'
import {MapContainer, TileLayer} from "react-leaflet";
import {LatLngExpression, LatLngLiteral} from "leaflet";
import {useAppDispatch, useAppSelector} from "@/hooks/hook";
import Coords from "@/components/Map/Coords/Coords";
import Settings from "@/components/Settings";
import Ruler from "@/components/Map/Ruler/Ruler";
import {addRulerMarker, addRulerMarkerPos} from "@/store/ruler/ruler-slice";
import Cursor from "@/components/Cursor/Cursor";
import Regions from "@/components/Map/Regions/Regions";
import NatureReserves from "@/components/Map/NatureReserves/NatureReserves";
import RulerMarkers from "@/components/Map/RulerMarkers/RulerMarkers";
import Settlements from "@/components/Map/Settlements/Settlements";
import {Loading} from "@/components/main/Loading/Loading";
import {TileService} from "@/components/TileService/TileService";
import {ESatellite} from "@/enums/ESatellite";
import {EComposite} from "@/enums/EComposite";
import {Route} from "react-router-dom";

//спасибо центру за это
const CENTR:LatLngExpression = [54.84643545576913, 83.05183410644533];



const Map = () => {

  const layer:string = useAppSelector(state => state.map).layer
  const isRulerActive:boolean = useAppSelector(state => state.ruler).isRulerActive
  const mousePos:LatLngLiteral = useAppSelector(state => state.cursor).mousePos
  const isCursorActive:boolean = useAppSelector(state => state.cursor).isActive
  const isRegions:boolean = useAppSelector(state => state.map).isRegions
  const isNatureReserves:boolean = useAppSelector(state => state.map).isNatureReserves
  const isSettlements:boolean = useAppSelector(state => state.map).isSettlements
  const isLoading:boolean = useAppSelector(state => state.map).isLoading

  const satelliteState: ESatellite = useAppSelector(state => state.tile).satellite
  const compositeState: EComposite = useAppSelector(state => state.tile).composite
  const date = useAppSelector(state => state.tile).dateTime.nondotdate
  const time = useAppSelector(state => state.tile).dateTime.time



    const dispatch = useAppDispatch()

    const addMarker = (event) => {
      if((event.clientY < window.window.innerHeight - 68) || (event.clientX < window.window.innerWidth - 116)) {
          dispatch(addRulerMarker({position: mousePos, title: ""}))
          dispatch(addRulerMarkerPos([mousePos.lat, mousePos.lng]))
      }
    }


    return (
        <>
            {isLoading ?
                <Loading/>
            :
                <div onClick={isRulerActive ? addMarker: null}>
                    <MapContainer
                        center={CENTR}
                        maxZoom={13}
                        zoom={4}
                        minZoom={3}
                        scrollWheelZoom={true}
                        maxBounds={[[-110, -170], [100, 200]]}
                        doubleClickZoom={false}
                    >
                        <TileLayer 
                            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" 
                            opacity={0.4} 
                            zIndex={1} 
                        />

                        {satelliteState != null && compositeState != null && time != null && date != null && <TileService />}


                        {isRegions && <Regions />}
                        {isNatureReserves && <NatureReserves />}
                        {isSettlements && <Settlements />}


                        <RulerMarkers />

                        <Coords />
                        <Settings />
                        


                        <Ruler/>

                        {isCursorActive ? <Cursor /> : ""}
                    </MapContainer>
                </div>
            }
        </>

  );
}


export default Map