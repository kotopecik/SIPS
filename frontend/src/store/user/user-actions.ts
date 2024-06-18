import {createAsyncThunk} from "@reduxjs/toolkit";
import AuthService from "@/service/auth-service";
import { IUser } from "@/interfaces/IUser";
import axios from "axios";
import { API_URL } from "@/http";
import { AuthorizationResponse } from "@/interfaces/response/AuthorizationResponse";



export const loginUser = createAsyncThunk('user/loginUser',
    async (user:IUser) => {
        try{
            const response = await AuthService.login(user.email, user.password)
            localStorage.setItem('token', response.data.access)
            localStorage.setItem('refresh', response.data.refresh)
            return response.data
        }catch (err){
            console.log('login failed')
            console.log(err)
        }

    },
)


export const registerUser = createAsyncThunk('user/registerUser',
    async (user:IUser) => {
        try{
            const response = await AuthService.registration(user)
        }catch (err){
            console.log("register failed")
            console.log(err)
        }
    },
)

export const logoutUser = createAsyncThunk('user/logoutUser',
    async () => {
        try{
            const response = await AuthService.logout()
            localStorage.removeItem('token')
        }catch (err){
            console.log("logout failed")
            console.log(err)
        }

    },
)




export const checkAuth = createAsyncThunk('user/checkAuth',
    async () => {
        try {
            const response = await AuthService.refresh(localStorage.getItem('refresh'))
            return response.data
        }catch (err){
            console.log('refresh failed')
            console.log(err)
        }
    },
)