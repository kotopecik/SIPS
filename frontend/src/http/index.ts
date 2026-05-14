import axios from "axios";
import type { InternalAxiosRequestConfig } from "axios";

export const SERVER_URL = "https://gis-eng3.esemc.nsc.ru:8443";
export const API_URL = `${SERVER_URL}/api`;

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