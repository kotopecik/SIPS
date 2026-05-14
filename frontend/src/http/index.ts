import axios from "axios";
import type { InternalAxiosRequestConfig } from "axios";
import { API_URL } from "@/shared/config";

const api = axios.create({
  baseURL: API_URL,
  withCredentials: false,
});

api.interceptors.request.use((config: InternalAxiosRequestConfig) => {
  const token = localStorage.getItem("token");

  if (token && !token.startsWith("mock_")) {
    config.headers.set("Authorization", `Bearer ${token}`);
  }

  return config;
});

export default api;