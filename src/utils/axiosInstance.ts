import axios from 'axios';
import * as Auth from '../storages/Auth';

const BASE_PATH = 'https://huydt.online';

const axiosInstance = axios.create({
  baseURL: BASE_PATH,
  headers: {
    'Content-Type': 'application/json',
  },
});

const publicUrl = ['/api/houses'];

axiosInstance.interceptors.request.use(
  (config) => {
    const token = Auth.getToken();
    if (config.method === 'get') {
      if (token && !publicUrl.includes(config.url)) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    } else {
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }

    return config;
  },
  (err) => {
    Promise.reject(err);
  },
);

axiosInstance.interceptors.response.use(
  (response) => {
    return response?.data;
  },
  (err) => {
    if (err.response) {
      const { data, status } = err.response;
      if (data || status) {
        return Promise.reject(data);
      }
    }
  },
);

export default axiosInstance;
