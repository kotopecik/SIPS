interface ILink{
    id: number,
    to: string,
    title: string
}


export const links: ILink[] = [
    {
        id: 1,
        to: "/about",
        title: "О нас",
    },
    {
        id: 2,
        to: "/management",
        title: "Руководство",
    },
    {
        id: 3,
        to: "/authorization",
        title: "Авторизация",
    },
    {
        id: 4,
        to: "registration",
        title: "Регистрация",
    },
]