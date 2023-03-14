import React from 'react';
import { Popconfirm, Button } from 'antd';
import * as Auth from '../../../storages/Auth';
export default function Logout({ title }: { title: any }) {
  const onLogout = () => {
    Auth.deAuthenticatedUser();
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
