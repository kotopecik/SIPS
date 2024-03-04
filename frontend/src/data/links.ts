import {ILink} from "@/interfaces/Ilink";


export const profileLinks: ILink[] = [
    {
        id: 1,
        to: "/",
        title: "Главная",
    },
    {
        id: 2,
        to: "/management",
        title: "Руководство пользователя",
    },
]

export const mainLinks: ILink[] = [
    {
        id: 1,
        to: "/about",
        title: "Профиль",
    },
    {
        id: 2,
        to: "/authorization",
        title: "Вход",
    },
]
