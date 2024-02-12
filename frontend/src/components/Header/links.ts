interface ILink{
    id: number,
    to: string,
    title: string
}


export const links: ILink[] = [
    {
        id: 1,
        to: "/about",
        title: "Главная",
    },
    {
        id: 2,
        to: "/management",
        title: "Руководство пользователя",
    },
    {
        id: 3,
        to: "/authorization",
        title: "Вход",
    },
]