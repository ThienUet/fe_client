import { axiosUtlis } from 'utils/axiosInstance';

export const deleteFcmToken = async ({ token }: { token: string }) => {
  return await axiosUtlis.f_delete(`/chat/notification/`, { token: token });
};

export const postFcmToken = async ({ token }: { token: string }) => {
  return await axiosUtlis._post('/chat/notification', {
    token: token,
  });
};
