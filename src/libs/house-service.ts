import { useQuery } from '@tanstack/react-query';
import { useMutation } from '@tanstack/react-query';
import {
  createHouse,
  getHouseDetail,
  getList,
  getListDistrict,
  getListProvince,
  getListWard,
  getMyPostList,
} from 'services/house-services';
import { House, HouseListParams, LocationListParams } from 'type/house';

interface HouseService {
  data: {
    houses: House[];
    size: number;
    currentPage: number;
    totalPage: number;
    totalSize: number;
  } | null;
  isLoading: boolean;
  error: boolean;
  refetch: () => void;
}

interface LocationService {
  data: {
    label: string;
    value: string;
  }[];
  isLoading: boolean;
  error: boolean;
  refetch: () => void;
}

interface LocationSample {
  code: string;
  name: string;
}

interface LocationOption {
  value: string;
  label: string;
}

const convertToValueLabel = (sample: LocationSample[]): LocationOption[] => {
  const newArray = sample.map((item: LocationSample) => {
    return {
      value: item.code,
      label: item.name,
    };
  });
  return newArray;
};

export const useGetHouseList = (params: HouseListParams): HouseService => {
  const option = {
    retry: 1,
    onError: (err: any) => {
      return err;
    },
  };
  const ParamArray = Object.entries(params).map((e) => ({ [e[0]]: e[1] }));

  const {
    data,
    refetch,
    isLoading,
    error,
  }: { data: any; refetch: any; isLoading: boolean; error: boolean } = useQuery(
    ['/get-list-house', ...ParamArray],
    () => {
      if (params.queryType === 'polygon') return getList(params) || null;
      return null;
    },
    option,
  );

  return { data: data || null, isLoading, refetch, error };
};

export const useGetProvinces = (): LocationService => {
  const option = {
    retry: 1,
    onError: (err: any) => {
      return err;
    },
  };

  const {
    data,
    refetch,
    isLoading,
    error,
  }: { data: any; refetch: any; isLoading: boolean; error: boolean } = useQuery(
    ['/get-list-province'],
    () => getListProvince(),
    option,
  );

  return {
    data: data?.data?.provinces ? convertToValueLabel(data?.data.provinces) : null,
    isLoading,
    refetch,
    error,
  };
};

export const useGetDistricts = (params: LocationListParams): LocationService => {
  const option = {
    retry: 1,
    onError: (err: any) => {
      return err;
    },
  };

  const {
    data,
    refetch,
    isLoading,
    error,
  }: { data: any; refetch: any; isLoading: boolean; error: boolean } = useQuery(
    ['/get-list-district', params.code],
    async () => {
      if (params.code) {
        return getListDistrict(params);
      } else {
        return null;
      }
    },
    option,
  );

  return {
    data: data?.provinces ? convertToValueLabel(data?.provinces) : null,
    isLoading,
    refetch,
    error,
  };
};

export const useGetWards = (params: LocationListParams): LocationService => {
  const option = {
    retry: 1,
    onError: (err: any) => {
      return err;
    },
  };

  const {
    data,
    refetch,
    isLoading,
    error,
  }: { data: any; refetch: any; isLoading: boolean; error: boolean } = useQuery(
    ['/get-list-ward', params.code],
    async () => {
      if (params.code) {
        return getListWard(params);
      } else {
        return null;
      }
    },
    option,
  );
  return {
    data: data?.ward ? convertToValueLabel(data?.ward) : null,
    isLoading,
    refetch,
    error,
  };
};

export const useCreateHouse = (house: House): any => {
  const option = {
    retry: 1,
    onError: (err: any) => {
      return err;
    },
  };
  const mutation = useMutation(['/create-house', house], () => createHouse(house), option);
  const { data, error, mutate, isLoading, isSuccess } = mutation;
  return {
    data: data || null,
    isLoading,
    mutate,
    error,
    isSuccess,
  };
};

export const useGetHouseDetail = ({
  id,
}: {
  id: string;
}): { data: any; isLoading: boolean; error: any; mutate: () => void; isSuccess: boolean } => {
  const option = {
    retry: 1,
    onError: (err: any) => {
      return err;
    },
  };
  const mutation = useMutation(['/get-house-detail'], () => getHouseDetail({ id: id }), option);
  const { data, error, mutate, isLoading, isSuccess } = mutation;
  return {
    data: data || null,
    isLoading,
    mutate,
    error,
    isSuccess,
  };
};

export const useGetMyPostList = (params: HouseListParams): HouseService => {
  const option = {
    retry: 1,
    onError: (err: any) => {
      return err;
    },
  };

  const {
    data,
    refetch,
    isLoading,
    error,
  }: {
    data: {
      houses: House[];
      size: number;
      currentPage: number;
      totalPage: number;
      totalSize: number;
    };
    refetch: any;
    isLoading: boolean;
    error: boolean;
  } = useQuery(
    ['/get-my-post-list', params],
    async () => {
      if (params.ownerId && params.queryFor && params.queryType) {
        return getMyPostList(params);
      } else {
        return null;
      }
    },
    option,
  );

  return {
    data: data || null,
    isLoading,
    refetch,
    error,
  };
};
