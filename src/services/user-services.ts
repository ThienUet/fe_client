import axios from '../utils/axiosInstance';

//RECHANGE WALLET
export const recharge_wallet_vnpay = async (body: any) =>
  await axios.post('/api/payment/vnpay', body);
export const recharge_wallet_manual = async (body: any) =>
  await axios.post('/api/payment/manual', body);
// GET PAYMENT HISTORY
export const getPaymentHistory = async () =>
  await axios.get('/api/users/me/my-payments').then((data) => data || null);
