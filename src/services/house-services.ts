import axiosInstance, { axiosUtlis } from '../utils/axiosInstance';
import { House, HouseEditable, HouseListParams, LocationListParams } from 'type/house';
import axios from 'axios';
import * as Auth from '../storages/Auth';

interface IHouseData {
  houses: House[];
  size: number;
  currentPage: number;
  totalPage: number;
  totalSize: number;
}

export const getList = async (params: HouseListParams): Promise<IHouseData> => {
  return await axiosUtlis._get('/api/houses', { ...params });
};

export const getListProvince = async () => {
  return await axios.get('https://d38jr024nxkzmx.cloudfront.net/provinces.json');
};

export const getListDistrict = async (params: LocationListParams) => {
  return await axiosInstance.get(`/api/country/${params.code}/districts`);
};

export const getListWard = async (params: LocationListParams) => {
  return await axiosInstance.get(`/api/country/districts/${params.code}/wards`);
};

export const createHouse = async (data: House) => {
  return await axiosInstance.post(`/api/houses`, { ...data });
};

export const getMyPostList = async (params: HouseListParams) => {
  const token = Auth.getToken();

  return await axiosInstance.get('/api/houses', {
    params: params,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const getHouseDetail = async ({ id }: { id: string }) => {
  return (await axios.get(`https://huydt.online/api/houses/${id}`)).data;
};

export const editHouseDetail = async ({ data, id }: { data: HouseEditable; id: string }) => {
  return await axiosInstance.put(`/api/houses/${id}`, { ...data });
};

export const deleteHouse = async ({ id }: { id: string }) => {
  return await axiosInstance.delete(`/api/houses/${id}`);
};
