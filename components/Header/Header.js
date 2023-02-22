import React from 'react';
import {Divider, Dropdown, Space} from 'antd';
import { DownOutlined, SmileOutlined } from '@ant-design/icons';
import Link from 'next/link';
import Image from 'next/image';
//Change here to custom NavBar
const headerObject = {
    navbarLeft: [
        {title: 'Mua', link: 'aaaaaaaaaaa'},
        {title: 'Bán', link: 'aaaaaaaaaaa'},
        {title: 'Thuê', link: 'aaaaaaaaaaa'},
        {title: 'Tìm kiếm', link: 'aaaaaaaaaaa'},
        {title: 'Cho vay', link: 'aaaaaaaaaaa'}
    ],
    navbarRight: [
        {title: 'Quản lý', link: 'aaaaaaaaaaa'},
        {title: 'Quảng cáo', link: 'aaaaaaaaaaa'},
        {title: 'Trợ giúp', link: 'aaaaaaaaaaa'},
        {title: 'Tài khoản', link: 'aaaaaaaaaaa'}
    ],
    logoURL: '/static/logo/logo.png'
}

const navStyle = ['origin', 'logo_center', 'no-logo'];

const items = [
    {
      key: '1',
      label: (
        <a target="_blank" rel="noopener noreferrer" href="https://www.antgroup.com">
          1st menu item
        </a>
      ),
    },
    {
      key: '2',
      label: (
        <a target="_blank" rel="noopener noreferrer" href="https://www.aliyun.com">
          2nd menu item (disabled)
        </a>
      ),
      icon: <SmileOutlined />,
      disabled: true,
    },
    {
      key: '3',
      label: (
        <a target="_blank" rel="noopener noreferrer" href="https://www.luohanacademy.com">
          3rd menu item (disabled)
        </a>
      ),
      disabled: true,
    },
    {
      key: '4',
      danger: true,
      label: 'a danger item',
    },
  ];

export default function Header() {
    return (
        <div className='container app-header'>
            <div className='row'>
                <div className='col-5 col-sm-5 col-md-5'>
                    <ul className='d-flex app-header-ul justify-content-start'>
                        {
                            headerObject.navbarLeft.map((item, index) => {
                                return (
                                    <li className='app-header-item me-4' key={index}>
                                        <Dropdown menu={{items}} >
                                            <Link className='app-header-link' href="#">{item.title}</Link>
                                        </Dropdown>
                                    </li>)
                            
                        })
                    }
                    </ul>
                </div>
                <div className='col-2 col-sm-2 col-md-2 position-relative'>
                    <div className='col-8'>
                      <Link href={'http://localhost:8888/'}> <Image layout='fill'  objectFit='contain' src={headerObject.logoURL} alt='LOGO'/> </Link>
                    </div>
                </div>
                <div className='col-5 col-sm-5 col-md-5'>
                    <ul className='d-flex app-header-ul justify-content-end'>
                        {
                            headerObject.navbarRight.map((item, index) => {
                                return (
                                    <li className='app-header-item ms-4 ' key={index}>
                                        <Dropdown menu={{items,}} >
                                            <Link className='text-center app-header-link' href="#">{item.title}</Link>
                                        </Dropdown>
                                    </li>)
                            })
                        }
                    </ul>
                </div>
            </div>
        </div>
    )
}

