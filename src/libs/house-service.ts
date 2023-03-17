import { useQuery } from '@tanstack/react-query';
import { HouseListParams } from 'services/house-services';
import { getList } from 'services/house-services';

interface HouseService {
  data: any;
  isLoading: boolean;
  error: boolean;
  refetch: () => void;
}

export const useGetHouseList = (params: HouseListParams): HouseService => {
  const option = {
    retry: 1,
    onError: (err: any) => {
      return err;
    },
  };
  const ParamArray = Object.entries(params).map((e) => ({ [e[0]]: e[1] }));

  const { data, refetch, isLoading, error } = useQuery(
    ['/get-list-house', ...ParamArray],
    () => getList(params),
    option,
  );

  return { data: data || null, isLoading, refetch, error };
};
