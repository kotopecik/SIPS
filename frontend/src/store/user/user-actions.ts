import {createAsyncThunk} from "@reduxjs/toolkit";
import AuthService from "@/service/auth-service";
import { IUser } from "@/interfaces/IUser";



export const loginUser = createAsyncThunk(
  "user/login",
  async (payload: { email: string; password: string }, thunkAPI) => {
    try {
      const res = await AuthService.login(payload.email, payload.password);

      // ВАЖНО: сохраняем токены
      localStorage.setItem("token", res.data.access);
      localStorage.setItem("refresh", res.data.refresh);

      return res.data; // {access, refresh}
    } catch (e) {
      return thunkAPI.rejectWithValue("Ошибка авторизации");
    }
  }
);


export const registerUser = createAsyncThunk('user/registerUser',
    async (user:IUser) => {
        try{
            const response = await AuthService.registration(user)
        }catch (err){
            return err.response.data
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
            localStorage.setItem('token', response.data.access)
            return response.data
        }catch (err){
            console.log('refresh failed')
            return {access: '', refresh: ''}
        }
    },
)