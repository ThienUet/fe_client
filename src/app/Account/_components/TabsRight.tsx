import React, { PropsWithChildren } from 'react';
import { Tabs } from 'antd';
import ChangeInfoForm from './ChangeInfoForm';
import UpgradeService from './UpgradeService';
import UserView from './UserView';
import PaymentHistory from './PaymentHistory';
import { useRouter } from 'next/router';
import SettingService from './SettingService';

interface Props extends PropsWithChildren {
  formatter: any;
  user: any;
  userRefetch: any;
}
const TabsRight: React.FC<Props> = ({ formatter, user, userRefetch }) => {
  const router = useRouter();
  const items = [
    {
      key: 'view',
      label: `Xem thông tin cá nhân`,
      children: <UserView formatter={formatter} user={user} />,
    },
    {
      key: 'change-info',
      label: `Chỉnh sửa thông tin cá nhân`,
      children: <ChangeInfoForm userRefetch={userRefetch} user={user} />,
    },
    {
      key: 'payment-history',
      label: `Lịch sử thanh toán`,
      children: <PaymentHistory formatter={formatter} />,
    },
    {
      key: 'services',
      label: `Dịch vụ`,
      children: <UpgradeService />,
    },
    {
      key: 'settings',
      label: `Cài đặt`,
      children: <SettingService />,
    },
  ];
  const defaultTab: any = router.query.profileTab || 'view';
  return <Tabs defaultActiveKey={defaultTab} items={items} />;
};

export default TabsRight;
