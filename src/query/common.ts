import { useQuery } from '@tanstack/react-query';
import { getPaymentHistory } from 'services/user-services';

export const usePaymentHistory = () =>
  useQuery(['payment_history'], () => getPaymentHistory(), {
    retry: false,
    refetchOnWindowFocus: false,
    retryOnMount: false,
  });
