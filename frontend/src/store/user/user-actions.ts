import { createAsyncThunk } from "@reduxjs/toolkit";
import AuthService from "@/service/auth-service";
import { AuthMock } from "@/service/auth-mock";
import { MOCK_AUTH } from "@/shared/config";
import { IUser } from "@/interfaces/IUser";

// LOGIN
export const loginUser = createAsyncThunk(
  "user/login",
  async (payload: { email: string; password: string }, thunkAPI) => {
    try {
      const data = MOCK_AUTH
        ? await AuthMock.login(payload.email, payload.password)
        : (await AuthService.login(payload.email, payload.password)).data;

      localStorage.setItem("token", data.access);
      localStorage.setItem("refresh", data.refresh);

      return data; // {access, refresh}
    } catch {
      return thunkAPI.rejectWithValue("Ошибка авторизации");
    }
  }
);

// REGISTER
export const registerUser = createAsyncThunk(
  "user/register",
  async (user: IUser, thunkAPI) => {
    try {
      if (MOCK_AUTH) {
        await AuthMock.registration(user);
        return { ok: true };
      }

      return (await AuthService.registration(user)).data;
    } catch {
      return thunkAPI.rejectWithValue("Ошибка регистрации");
    }
  }
);

// LOGOUT
export const logoutUser = createAsyncThunk("user/logout", async () => {
  try {
    if (MOCK_AUTH) {
      await AuthMock.logout();
    } else {
      await AuthService.logout();
    }
  } finally {
    localStorage.removeItem("token");
    localStorage.removeItem("refresh");
  }
});

// CHECK AUTH (refresh)
export const checkAuth = createAsyncThunk("user/checkAuth", async () => {
  try {
    const refresh = localStorage.getItem("refresh");

    const data = MOCK_AUTH
      ? await AuthMock.refresh(refresh)
      : (await AuthService.refresh(refresh as any)).data;

    localStorage.setItem("token", data.access);
    if (data.refresh) localStorage.setItem("refresh", data.refresh);

    return data;
  } catch {
    return { access: "", refresh: "" };
  }
});