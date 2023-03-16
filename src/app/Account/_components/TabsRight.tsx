import React from 'react';
import { Tabs } from 'antd';
import ChangeInfoForm from './ChangeInfoForm';
import UpgradeService from './UpgradeService';
import UserView from './UserView';

export default function TabsRight({ user, userRefetch }: { user: any; userRefetch: any }) {
  const items = [
    {
      key: '1',
      label: `Xem thông tin cá nhân`,
      children: <UserView user={user} />,
    },
    {
      key: '2',
      label: `Chỉnh sửa thông tin cá nhân`,
      children: <ChangeInfoForm userRefetch={userRefetch} user={user} />,
    },
    {
      key: '3',
      label: `Lịch sử thanh toán`,
      children: <UpgradeService />,
    },
    {
      key: '4',
      label: `Cài đặt`,
      children: <UpgradeService />,
    },
  ];

  return <Tabs defaultActiveKey='1' items={items} />;
}
