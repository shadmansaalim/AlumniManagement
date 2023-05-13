import axios from 'axios';
import { getToken } from "../hooks/LocalStorage";

const axiosInstance = axios.create();

// Add an interceptor to update the Authorization header on every request
axiosInstance.interceptors.request.use(config => {
    const token = getToken();
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

export default axiosInstance;
