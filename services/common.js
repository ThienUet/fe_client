import axios from '../utils/axiosInstance';
import axiosOrigin from 'axios';
// ALL USER API THROUGH WITH TOKEN
export const getUser                = async()            => await axios.get('/api/users/me/my-info').then((data) => data || null);


//login+register => NO TOKEN
export const Login                  = async(body)            => await axiosOrigin.post('http://103.162.20.167:8099/realms/nhatrotot/protocol/openid-connect/token', body, {headers: {'Content-Type': 'application/x-www-form-urlencoded'}});
export const register               = async(body)            => await axiosOrigin.post('http://103.162.20.167/api/auth/signup', body, {headers: {'Content-Type': 'application/json'}});