import axios from '../utils/axiosInstance';
import axiosOrigin from 'axios';
// ALL USER API THROUGH WITH TOKEN
export const getUser = async () =>
  await axios.get('/api/users/me/my-info').then((data) => data || null);
export const updateUserInfo = async (body) => await axios.put('/api/users/me/my-info', body);

//login+register => NO TOKEN
export const Login = async (body: any) =>
  await axiosOrigin.post(
    'https://huydt.online/auth/realms/nhatrotot/protocol/openid-connect/token',
    body,
    { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } },
  );
export const register = async (body: any) =>
  await axiosOrigin.post('https://huydt.online/api/auth/signup', body, {
    headers: { 'Content-Type': 'application/json' },
  });
