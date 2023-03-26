import React, { useState } from 'react';
import { List } from 'antd';
import Link from 'next/link';
import Login from './_components/Login';
import Register from './_components/Register';
import Logout from './_components/Logout';

interface Props {
  data: any;
  router: any;
  user: any;
}

export default function Dropdown(props: Props) {
  const { data, router, user } = props;
  const [onLoginOpen, setOnLoginOpen] = useState(false);
  const [onRegisterOpen, setOnRegisterOpen] = useState(false);
  return (
    <div className='header_drop_down'>
      <List
        itemLayout='horizontal'
        dataSource={data}
        renderItem={(item: any) => (
          <List.Item>
            {item.key === 'login' ? (
              <Login
                showText={true}
                router={router}
                onLoginOpen={onLoginOpen}
                setOnLoginOpen={setOnLoginOpen}
                setOnRegisterOpen={setOnRegisterOpen}
              />
            ) : item.key === 'register' ? (
              <Register
                onRegisterOpen={onRegisterOpen}
                setOnLoginOpen={setOnLoginOpen}
                setOnRegisterOpen={setOnRegisterOpen}
              />
            ) : item.key === 'logout' ? (
              <Logout title={item.title} />
            ) : item.key === 'link' ? (
              <Link
                prefetch={true}
                legacyBehavior
                className='header-dropdown-link'
                title={`Đi đến ${item.title}`}
                href={item.link}
              >
                <a>{item.title}</a>
              </Link>
            ) : (
              <div
                className='header-dropdown-link user-name-show'
                title={`Tài khoản của ${user?.firstName} ${user?.lastName} `}
              >
                {item.title}
              </div>
            )}
          </List.Item>
        )}
      />
    </div>
  );
}
