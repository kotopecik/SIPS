import { IUser } from "@/interfaces/IUser";

export interface UserState{
    user : IUser
    isAuth : boolean
    isLoading : boolean
    token : string,
    refresh : string
}