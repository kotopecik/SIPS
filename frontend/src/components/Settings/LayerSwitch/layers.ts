import {ILayer} from "@/interfaces/ILayer";


export const layers:ILayer[] = [
    {
        name: 'Standart map',
        url: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
    },
    {
        name: 'ESRI map',
        url: 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',
    },
    {
        name: 'Monochrome map',
        url: 'https://cartodb-basemaps-{s}.global.ssl.fastly.net/dark_all/{z}/{x}/{y}.png',
    },
]