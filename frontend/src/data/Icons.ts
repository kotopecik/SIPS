import {Icon} from "leaflet";

export const icons = () => {
    const customIcon = new Icon({
        iconUrl: require("../assets/img/marker-icon.png"),
        iconSize: [60, 60]
    });

    const rulerIcon = new Icon({
        iconUrl: require("../assets/add-circle-svgrepo-com.svg"),
        iconSize:[40, 40]
    })
    const emptyIcon = new Icon({
        iconUrl: require("../assets/empty.png"),
        iconSize:[40, 40]
    })

    return {customIcon, rulerIcon, emptyIcon}
}