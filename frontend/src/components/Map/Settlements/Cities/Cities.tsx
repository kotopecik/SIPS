import React from 'react';
import {ICity} from "@/interfaces/ICity";
import {EType} from "@/enums/EType";
import {Marker, Popup} from "react-leaflet";
import {icons} from "@/data/icons";
import {useAppSelector} from "@/hooks/hook";

const Cities = () => {
    const cities:ICity[] = useAppSelector(state => state.map).polygons.cities
    return (
        <>
            {cities.map((city:ICity, index) => (
                city.type === EType.CITY &&
                <Marker icon = {icons().customIcon} key = {index} position = {[city.latitude, city.longitude]}>
                    <Popup>
                        {city.name}
                    </Popup>
                </Marker>
            ))}
        </>
    );
};

export default Cities;