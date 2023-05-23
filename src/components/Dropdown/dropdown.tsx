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
  const { data, user } = props;
  return (
    <div className='header_drop_down'>
      <List
        itemLayout='horizontal'
        dataSource={data}
        style={{ padding: '4px 12px' }}
        renderItem={(item: any, index: number) => (
          <List.Item>
            {item.key === 'logout' ? (
              <Logout title={item.title} />
            ) : item.key === 'link' ? (
              <Link
                prefetch={true}
                legacyBehavior
                className='header-dropdown-link'
                title={`Đi đến ${item.title}`}
                href={item.link}
                key={index}
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
