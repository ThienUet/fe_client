import axiosInstance from '../utils/axiosInstance';
import axios from 'axios';

export interface HouseListParams {
  queryFor: 'map' | 'normal';
  queryType: 'distance' | 'polygon' | 'all';
  distance?: number; // maximum 100 km;
  polygonPoints?: number[]; //min item 8
  mapPoint?: string; //[lng, lat]
  pageSize?: number; //default 20
  pageNumber?: number; //default 0
  houseType?: number; // 1 - 5
  ownerId?: string;
  houseCategory?: number; // 1 - 2
  hasAc?: boolean;
  hasParking?: boolean;
  hasElevator?: boolean;
  hasFurnished?: boolean;
  allowPet?: boolean;
  province?: string;
  district?: string;
  ward?: string;
  squareLte?: number; // min 0 less than or equal
  squareGte?: number; // min 0 greater than or equal
  roomLte?: number; // room less than or equal
  roomGte?: number; // room greater than or equal
  bedRoomLte?: number;
  bedRoomGte?: number;
  bathRoomLte?: number;
  bathRoomGte?: number;
  fromDate?: number;
  toDate?: number;
  priceFrom?: number;
  priceTo?: number;
  sortBy?: 'created_date' | 'price' | 'distanceToPoint'; // default created_date
  sortOrder?: 'asc' | 'desc';
}

export const getList = async (params: HouseListParams) => {
  return await axiosInstance.get('/api/houses', { params: params });
};
