import axios from "axios";
import type { InternalAxiosRequestConfig } from "axios";

export const API_URL = "http://84.237.93.16:8080/api";

const api = axios.create({
  baseURL: API_URL,
  withCredentials: true,
});

api.interceptors.request.use((config: InternalAxiosRequestConfig) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.set("Authorization", `Bearer ${token}`);
  }
  return config;
});

export default api;