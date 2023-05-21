import { useQuery } from '@tanstack/react-query';
import { checkFollowing } from 'services/user-services';

interface IGetFollowingCheck {
  isFollowing: boolean;
}

export const useGetFollwingCheck = (userId: string) => {
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
    data: IGetFollowingCheck;
    refetch: any;
    isLoading: boolean;
    error: boolean;
  } = useQuery(
    ['/get-following-check'],
    async () => {
      return checkFollowing({ userId: userId });
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
