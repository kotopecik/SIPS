import {ILink} from "@/interfaces/Ilink";


export const profileLinks: ILink[] = [
    {
        id: 1,
        to: "/home",
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
        to: "/profile",
        title: "Профиль",
    },
    {
        id: 2,
        to: "/authorization",
        title: "Вход",
    },
]

export const navbarLinks: ILink[] = [
    {
        id: 1,
        to: "/",
        title: "Перейти к карте",
    },
    {
        id: 2,
        to: "/profile",
        title: "Профиль",
    },
    {
        id: 3,
        to: "/home",
        title: "Главная",
    },
    {
        id: 4,
        to: "/management",
        title: "Руководство пользователя",
    },
    {
        id: 5,
        to: "/authorization",
        title: "Выход",
    },
]
