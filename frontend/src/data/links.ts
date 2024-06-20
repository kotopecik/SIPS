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
    {
        id: 3,
        to: "/catalog",
        title: "Каталог"
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

export const navbarLinksAuth: ILink[] = [
    {
        id: 1,
        to: "/",
        title: "Перейти к карте",
    },
    {
        id: 2,
        to: "/catalog",
        title: "Каталог"
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
    
]


export const navbarLinksNotAuth: ILink[] = [
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
    
]
