import React, { useState } from 'react';
import { Dropdown, Space, Avatar } from 'antd';
import Link from 'next/link';
import DropdownContent from '../Dropdown/dropdown';
// customize header
import style from './style.module.scss';

interface headerObj {
  // navbarLeft: any;
  navbarRight: any;
  logoURL: any;
}
const headerObject: headerObj = {
  navbarRight: [
    {
      title: 'Giới thiệu',
      data: [
        { title: 'Về chúng tôi', link: '/intro', key: 'link', id: '1' },
        { title: 'Liên hệ trực tiếp', link: '/contact', key: 'link', id: '2' },
      ],
    },
    {
      title: 'Điều khoản',
      data: [
        { title: 'Quy định của chúng tôi', link: '/post', key: 'link', id: '1' },
        { title: 'FA&Q', link: '/post/create-post', key: 'link', id: '2' },
        { title: 'Hỗ trợ', link: '/chat', key: 'link', id: '3' },
      ],
    },
    {
      title: 'Tài khoản',
      data: [
        { title: 'Đăng nhập', key: 'link', link: '/account/join_zee_home', id: '4' },
        { title: 'Đăng ký', key: 'link', link: '/account/join_zee_home?tab=register', id: '5' },
      ],
    },
  ],
  logoURL: '/static/logo/logo.png',
};

interface Props {
  router?: any;
  user?: any;
}

export default function Header({ router, user }: Props) {
  if (user) {
    headerObject.navbarRight.pop();
    headerObject.navbarRight.push(
      {
        title: 'Quản lý',
        data: [
          { title: 'Quản lý đăng tin', link: '/post', key: 'link', id: '1' },
          { title: 'Đăng tin mới', link: '/post/create-post', key: 'link', id: '2' },
        ],
      },
      {
        title: <Avatar src={user.image} />,
        data: [
          {
            title: `${user.firstName} ${user.lastName}`,
          },
          {
            title: `Trang cá nhân `,
            key: 'link',
            link: '/account',
            id: '8',
          },
          {
            title: `Đăng xuất`,
            key: 'logout',
            id: '9',
          },
        ],
      },
    );
  }

  return (
    <div className={style.headerContainer}>
      <div className='app-header'>
        <div className='row'>
          <div
            style={{ width: '11%' }}
            className='col-2 col-sm-2 col-md-2 position-relative app-header-logo'
          >
            <Link href={'/'} style={{ textDecoration: 'none' }}>
              <div className={style.intro}>
                <div className={style.appIcon}>
                  <img src='/static/logo/logo.png'></img>
                </div>
                <div>
                  <span
                    style={{
                      color: '#00004d',
                      fontWeight: '900',
                      fontSize: '1.3rem',
                      letterSpacing: '2px',
                    }}
                  >
                    Zee
                  </span>
                  <span
                    style={{
                      color: '#00004d',
                      fontSize: '1.3rem',
                    }}
                  >
                    Home
                  </span>
                </div>
              </div>
            </Link>
          </div>
          {/* Break */}
          <div style={{ width: '89%' }} className='right-nav col-5 col-sm-5 col-md-5'>
            <ul className='right-nav-list d-flex app-header-ul justify-content-end'>
              {headerObject.navbarRight.map((item: any, index: number) => {
                return (
                  <li className='app-header-item ms-4 ' key={index}>
                    <Dropdown
                      placement='bottom'
                      dropdownRender={() => (
                        <DropdownContent user={user} router={router} data={item.data} />
                      )}
                    >
                      <Space>
                        {item.key === 'link' ? (
                          <Link
                            legacyBehavior
                            className='app-header-link'
                            href={item.link}
                            key={item.id}
                          >
                            <a>{item.title}</a>
                          </Link>
                        ) : (
                          <div className='app-header-link'>{item.title}</div>
                        )}
                      </Space>
                    </Dropdown>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
