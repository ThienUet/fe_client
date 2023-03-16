import { useQuery } from '@tanstack/react-query';
import { getHouse, HouseListParams } from 'services/house-services';
import axiosInstance from 'utils/axiosInstance';

interface HouseService {
  data: any;
  isLoading: boolean;
  error: boolean;
  refetch: () => void;
}
const getList = async (params: HouseListParams) => {
  const d = await axiosInstance.get('/api/houses', { params: params });
  console.log(d);
  return d;
};

export const useGetHouseList = (params: HouseListParams) => {
  const option = {
    retry: 1,
    onError: (err: any) => {
      console.log(err);
    },
  };

  const { data, refetch, isLoading, error } = useQuery(
    ['/get-list-house'],
    () => getList(params),
    option,
  );
  return { data: data || null, isLoading, refetch, error };
};
