interface ILink{
    id: number,
    to: string,
    title: string
}




const profileLinks: ILink[] = [
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

const mainLinks: ILink[] = [
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


export const links = {mainLinks, profileLinks}