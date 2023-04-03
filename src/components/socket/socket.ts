import { io } from 'socket.io-client';
import * as Auth from './../../storages/Auth';

// "undefined" means the URL will be computed from the `window.location` object
const URL = 'https://huydt.online';

const token = Auth.getToken();

export const socket = io(URL, {
  extraHeaders: {
    Authorization: `Bearer ${token}`,
  },
  path: '/chat/socket.io',
  transports: ['websocket', 'polling'],
});
