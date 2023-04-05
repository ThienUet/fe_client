import React, { useMemo, useState } from 'react';
import { Dropdown, Space, Avatar, Button } from 'antd';
import Link from 'next/link';
import DropdownContent from '../Dropdown/dropdown';
// customize header
import style from './style.module.scss';
import HeaderSearch from 'components/google-map/header-search';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMap } from '@fortawesome/free-solid-svg-icons';

interface headerObj {
  // navbarLeft: any;
  navbarRight: any;
  logoURL: any;
}
const headerObject: headerObj = {
  navbarRight: [
    {
      title: 'Quản lý',
      data: [
        { title: 'Quản lý đăng tin', link: '/post', key: 'link', id: '1' },
        { title: 'Đăng tin mới', link: '/post/create-post', key: 'link', id: '2' },
        { title: 'Chat', link: '/chat', key: 'link', id: '3' },
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
  const [searchHouse, setSearchHouse] = useState<{
    pathName: '/search' | '/house';
    query: {
      lat: number;
      lng: number;
      houseCategory: string;
    };
  }>({
    pathName: '/search',
    query: null,
  });

  const handleClickSearch = () => {
    if (searchHouse?.pathName && searchHouse?.query?.houseCategory && searchHouse?.query?.lat) {
      router.push({
        pathname: searchHouse.pathName,
        query: {
          lat: searchHouse.query.lat,
          lng: searchHouse.query.lng,
          houseCategory: searchHouse.query.houseCategory,
        },
      });
    }
  };

  if (user) {
    headerObject.navbarRight.pop();
    headerObject.navbarRight.push({
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
    });
  }

  const handleChangePlace = ({
    lat,
    lng,
    houseType,
  }: {
    lat: number;
    lng: number;
    houseType?: string;
  }) => {
    setSearchHouse({
      ...searchHouse,
      query: { lat: lat, lng: lng, houseCategory: houseType },
    });
  };

  return (
    <div className={style.headerContainer}>
      <div className='app-header'>
        <div className='row'>
          <div className='col-2 col-sm-2 col-md-2 position-relative app-header-logo'>
            <div className='col-12'>
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
          </div>
          <div
            className='col-5 col-sm-5 col-md-5'
            style={{ display: 'flex', alignItems: 'center' }}
          >
            <HeaderSearch
              handleChangePlace={handleChangePlace}
              handleClickSearch={handleClickSearch}
            />
            <div
              style={{
                width: '100px',
                marginLeft: '12px',
                height: '40px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
                padding: '0px 8px',
                borderRadius: '6px',
                transition: 'all .3s ease-in-out',
                cursor: 'pointer',
                border: '1px solid #cccccc',
                backgroundColor: searchHouse.pathName === '/house' ? '#1677ff' : 'white',
                color: searchHouse.pathName === '/house' ? 'white' : 'black',
              }}
              onClick={() => {
                if (searchHouse.pathName === '/house') {
                  setSearchHouse({ ...searchHouse, pathName: '/search' });
                } else {
                  setSearchHouse({ ...searchHouse, pathName: '/house' });
                }
              }}
            >
              <FontAwesomeIcon icon={faMap} />
              Bản đồ
            </div>
          </div>
          <div className='col-5 col-sm-5 col-md-5'>
            <ul className='d-flex app-header-ul justify-content-end'>
              {headerObject.navbarRight.map((item, index: number) => {
                console.log(item);
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
