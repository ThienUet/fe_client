import React from 'react';
import { Tabs } from 'antd';
import type { TabsProps } from 'antd';
import LoginForm from './Login';
const items: TabsProps['items'] = [
  {
    key: '1',
    label: `ĐĂNG NHẬP`,
    children: <LoginForm />,
  },
  {
    key: '2',
    label: `ĐĂNG KÝ`,
    children: `Content of Tab Pane 2`,
  },
];

const LoginRegister: React.FC = () => {
  return (
    <div className='log-res-form'>
      <Tabs defaultActiveKey='1' items={items} />
    </div>
  );
};

export default LoginRegister;
