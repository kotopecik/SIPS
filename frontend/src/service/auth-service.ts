import api from "@/http";
import { AxiosResponse } from "axios";
import { AuthorizationResponse } from "@/interfaces/response/AuthorizationResponse";
import { RegistrationResponse } from "@/interfaces/response/RegistrationResponse";
import { IUser } from "@/interfaces/IUser";

export interface refresh{
    refresh: string
}

export default class AuthService{
    static async login(email: string, password: string): Promise<AxiosResponse<AuthorizationResponse>>{
        return api.post<AuthorizationResponse>('/token', {email, password})
    }
    static async registration(user : IUser): Promise<AxiosResponse<RegistrationResponse>>{
        return api.post<RegistrationResponse>('/users', user)
    }
    static async logout(): Promise<void>{
        return api.post('/logout')
    }
    static async refresh(refresh: string):Promise<AxiosResponse<AuthorizationResponse>>{
        console.log({refresh})
        return api.post<AuthorizationResponse>('/token/refresh', {refresh})
    }
}