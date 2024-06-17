import { IUser } from "@/interfaces/IUser";

export interface UserState{
    user : IUser
    isAuth : boolean
    isLoading : boolean
    access : string,
    refresh : string
}