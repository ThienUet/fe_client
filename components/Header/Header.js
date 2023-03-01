import React from 'react';
import { Dropdown, Space } from 'antd';
import { SmileOutlined } from '@ant-design/icons';
import Link from 'next/link';
import Image from 'next/image';
import DropdownContent from '../Dropdown/dropdown';
import {headerItem1} from './ItemDropdown';
//Change here to custom NavBar
const headerObject = {
    navbarLeft: [
        {title: 'Mua', link: 'aaaaaaaaaaa', data: [{title: 'Mua'}, {title: 'Mua'}, {title: 'Mua'}]},
        {title: 'Bán', link: 'aaaaaaaaaaa', data: [{title: 'Bán'}, {title: 'Bán'}, {title: 'Bán'}]},
        {title: 'Thuê', link: 'aaaaaaaaaaa', data: [{title: 'Thuê'}, {title: 'Thuê'}, {title: 'Thuê'}]},
        {title: 'Tìm kiếm', link: 'aaaaaaaaaaa', data: [{title: 'Tìm kiếm'}, {title: 'Tìm kiếm'}, {title: 'Tìm kiếm'}]},
        {title: 'Cho vay', link: 'aaaaaaaaaaa', data: [{title: 'Cho vay'}, {title: 'Cho vay'}, {title: 'Cho vay'}]}
    ],
    navbarRight: [
        {title: 'Quản lý', link: 'aaaaaaaaaaa', data: [{title: 'Quản lý'}, {title: 'Quản lý'}, {title: 'Quản lý'}]},
        {title: 'Quảng cáo', link: 'aaaaaaaaaaa', data: [{title: 'Quảng cáo'}, {title: 'Quảng cáo'}, {title: 'Quảng cáo'}]},
        {title: 'Trợ giúp', link: 'aaaaaaaaaaa', data: [{title: 'Trợ giúp'}, {title: 'Trợ giúp'}, {title: 'Trợ giúp'}]},
        {title: 'Tài khoản', link: 'aaaaaaaaaaa', data: [{title: 'Tài khoản'}, {title: 'Tài khoản'}, {title: 'Tài khoản'}]}
    ],
    logoURL: '/static/logo/logo.png'
}

const navStyle = ['origin', 'logo_center', 'no-logo'];

export default function Header() {
    return (
        <div className='container app-header'>
            <div className='row'>
            <div className='col-5 col-sm-5 col-md-5'>
                  <ul className='d-flex app-header-ul justify-content-start'>
                    {
                      headerObject.navbarLeft.map((item, index) => {
                          return (
                            <li className='app-header-item me-4 ' key={index}>
                                <Dropdown dropdownRender={() => <DropdownContent data={item.data}/>}>
                                  <Space>
                                    <Link className='app-header-link' href="#">{item.title}</Link>
                                  </Space>
                                </Dropdown>
                            </li>)
                      })
                    }
                  </ul>
                </div>
                <div className='col-2 col-sm-2 col-md-2 position-relative'>
                  <div className='col-12'>
                    <Link href={'/'}> <Image layout='fill'  objectFit='contain' src={headerObject.logoURL} alt='LOGO'/> </Link>
                  </div>
                </div>
                <div className='col-5 col-sm-5 col-md-5'>
                  <ul className='d-flex app-header-ul justify-content-end'>
                    {
                      headerObject.navbarRight.map((item, index) => {
                          return (
                            <li className='app-header-item ms-4 ' key={index}>
                                <Dropdown dropdownRender={() => <DropdownContent data={item.data}/>}>
                                  <Space>
                                    <Link className='app-header-link' href="#">{item.title}</Link>
                                  </Space>
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

