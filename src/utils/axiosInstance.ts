import axios from 'axios';
import * as Auth from '../storages/Auth';

const BASE_PATH = 'https://huydt.online/';

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
    if (token && !(publicUrl.includes(config.url) && config.method === 'GET')) {
      config.headers.Authorization = `Bearer ${token}`;
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

const _get = <Reqtype, ResType>(
  url: string,
  params?: Reqtype,
  customHeaders?: any,
): Promise<ResType> => {
  return axiosInstance.get(url, { params, headers: customHeaders });
};

const _post = <Reqtype, ResType>(
  url: string,
  data: Reqtype,
  customHeaders?: any,
): Promise<ResType> => {
  return axiosInstance.post(url, data, { headers: customHeaders });
};

async function _put<Reqtype, ResType>(
  url: string,
  data: Reqtype,
  customHeaders?: any,
): Promise<ResType> {
  return axiosInstance.put(url, data, { headers: customHeaders });
}

async function _delete<Reqtype, Restype>(
  url: string,
  params?: Reqtype,
  customHeaders?: any,
): Promise<Restype> {
  return axiosInstance.delete(url, { params, headers: customHeaders });
}

async function f_delete<Reqtype, Restype>(
  url: string,
  data?: Reqtype,
  customHeaders?: any,
): Promise<Restype> {
  return axiosInstance.delete(url, { data: data, headers: customHeaders });
}

const axiosUtlis = { _post, _put, _get, _delete, f_delete };

export { axiosUtlis };

export default axiosInstance;
