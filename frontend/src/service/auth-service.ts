import api from "@/http";
import { AxiosResponse } from "axios";
import { AuthorizationResponse } from "@/interfaces/response/AuthorizationResponse";
import { RegistrationResponse } from "@/interfaces/response/RegistrationResponse";
import { IUser } from "@/interfaces/IUser";


export default class AuthService{
    static async login(email: string, password: string): Promise<AxiosResponse<AuthorizationResponse>>{
        return api.api.post<AuthorizationResponse>('vAUTH/token', {email, password})
    }
    static async registration(user : IUser): Promise<AxiosResponse<RegistrationResponse>>{
        return api.apireg.post<RegistrationResponse>('vAUTH/users', user)
    }
    static async logout(): Promise<void>{
        return api.api.post('/logout')
    }
    static async refresh(refresh: string):Promise<AxiosResponse<AuthorizationResponse>>{
        return api.api.post<AuthorizationResponse>('vAUTH/token/refresh', {refresh})
    }
}