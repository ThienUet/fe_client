import React from 'react';
import { Popconfirm } from 'antd';
import * as Auth from '../../../storages/Auth';
import { getMessaging, deleteToken } from 'firebase/messaging';
import { useMutation } from '@tanstack/react-query';
import { deleteFcmToken } from 'services/fcm-services';

export default function Logout({ title }: { title: any }) {
  async function deleteThisToken() {
    if (getMessaging()) {
      await deleteToken(getMessaging());
    }
  }

  const onLogout = async () => {
    const zeehome_fcm_token = localStorage.getItem('zeehome_fcm_token');

    // delete both client and remote
    await deleteThisToken();
    zeehome_fcm_token && (await deleteFcmToken({ token: zeehome_fcm_token }));

    Auth.deAuthenticatedUser();
    // reset token in localstorage
    localStorage.removeItem('zeehome_fcm_token');
    localStorage.removeItem('zeehome_fcm_status');
    window.location.replace('/');
  };

  return (
    <div>
      <Popconfirm
        placement='bottomRight'
        title='Thông báo'
        description='Bạn có muốn đăng xuất tài khoản ?'
        onConfirm={onLogout}
        okText='Có'
        cancelText='Không'
      >
        <div className='logout-pop-title' title='Đăng xuất tài khoản'>
          {title}
        </div>
      </Popconfirm>
    </div>
  );
}
