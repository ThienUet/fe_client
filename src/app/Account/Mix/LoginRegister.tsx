import React from 'react';
import { Tabs } from 'antd';
import type { TabsProps } from 'antd';
import LoginForm from './Login';
import RegisterIn from './Register';
import { useRouter } from 'next/router';
const items: TabsProps['items'] = [
  {
    key: 'login',
    label: `ĐĂNG NHẬP`,
    children: <LoginForm />,
  },
  {
    key: 'register',
    label: `ĐĂNG KÝ`,
    children: <RegisterIn />,
  },
];

const LoginRegister: React.FC = () => {
  const router = useRouter();
  const { query }: any = router;
  return (
    <div className='log-res-form'>
      <Tabs defaultActiveKey={query.tab || 'login'} items={items} />
    </div>
  );
};

export default LoginRegister;
