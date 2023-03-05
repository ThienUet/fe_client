import axios from "axios";
import * as Auth from '../storages/Auth';
let BASE_PATH = 'https:103.162.20.167';
if (typeof window === undefined) {
    BASE_PATH = 'http://localhost:8888'
}

const axiosInstance = axios.create({
    baseURL: `${BASE_PATH}`,
    timeout: 300000,
});

axiosInstance.interceptors.request.use(
    (config) => {
        const token = Auth.getToken();
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
            config.headers["Content-Type"] = 'application/json';
        }
        return config;
    },
    (err) => Promise.reject(err)
);

axiosInstance.interceptors.response.use(
    (response) => {
        return response?.data;
    },
    (err) => {
        if (err.response) {
            const {data, status} = err.response;
            if (data || status) {
                return Promise.reject(data);
            }
        }
    }
)

export default axiosInstance;

