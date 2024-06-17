import {createAsyncThunk} from "@reduxjs/toolkit";
import AuthService, { refresh } from "@/service/auth-service";
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
            console.log(response.data)
            return response.data
        }catch (err){
            console.log(err)
        }

    },
)


export const registerUser = createAsyncThunk('user/registerUser',
    async (user:IUser) => {
        try{
            const response = await AuthService.registration(user)
        }catch (err){
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
            console.log(err)
        }

    },
)


export const checkAuth = createAsyncThunk('user/checkAuth',
    async () => {
        try {
            const response = await AuthService.refresh(localStorage.getItem('refresh'))
            console.log('checkAuth')
            console.log('access ' + response.data.access)
            console.log('refresh ' + response.data.refresh)
            //localStorage.setItem('token', response.data.access)
            return response.data
        }catch (err){
            console.log('refresh not worked')
        }
    },
)