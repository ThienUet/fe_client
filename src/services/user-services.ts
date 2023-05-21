import axiosInstance, { axiosUtlis } from '../utils/axiosInstance';
import axios from '../utils/axiosInstance';

//RECHANGE WALLET
export const recharge_wallet_vnpay = async (body: any) =>
  await axios.post('/api/payment/vnpay', body);
export const recharge_wallet_manual = async (body: any) =>
  await axios.post('/api/payment/manual', body);
// GET PAYMENT HISTORY
export const getPaymentHistory = async () =>
  await axios.get('/api/users/me/my-payments').then((data) => data || null);

// GET USER DETAIL
export const getUserDetail = async ({ userId }: { userId: string }) => {
  return await axiosInstance.get(`/api/users/${userId}`);
};

export const setFollowing = async ({ userId }: { userId: string }) => {
  return await axiosInstance.post('api/users/actions/following', {
    userId: userId,
  });
};

export const deleteFollowing = async ({ userId }: { userId: string }) => {
  return await axiosUtlis.f_delete('api/users/actions/following', {
    userId: userId,
  });
};

export const checkFollowing = async ({ userId }: { userId: string }) => {
  return await axiosInstance.get(`api/users/actions/following/checking/${userId}`);
};

export const getFollowing = async ({ page, size }: { page: number; size: number }) => {
  return await axiosInstance.get(`api/users/actions/following`, {
    params: {
      page: page,
      size: size,
    },
  });
};
