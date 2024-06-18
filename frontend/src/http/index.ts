import axios from 'axios'

export const API_URL = `http://84.237.93.16:8080/api`;


const api = axios.create({
    withCredentials: true,
    baseURL: API_URL
})



api.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
}, (error) => {
    return Promise.reject(error);
});

export default api