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
        to: "/catalog",
        title: "Каталог"
    },
    {
        id: 2,
        to: "/",
        title: "Перейти к карте",
    },
    {
        id: 3,
        to: "/profile",
        title: "Профиль",
    },
    {
        id: 4,
        to: "/home",
        title: "Главная",
    },
    {
        id: 5,
        to: "/management",
        title: "Руководство пользователя",
    },
    {
        id: 6,
        to: "/authorization",
        title: "Выход",
    },
]
