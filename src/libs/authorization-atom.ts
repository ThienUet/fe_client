import { AUTH_TOKEN_KEY } from '../config/constants';
import { atom } from 'jotai';
import Cookies from 'js-cookie';

export function checkIsLoginIn() {
  const token = Cookies.get(AUTH_TOKEN_KEY);
  if (!token) return false;
  return true;
}
export const authorizationAtom = atom(checkIsLoginIn());
