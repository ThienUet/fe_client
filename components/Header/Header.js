import React from 'react';
import { Dropdown, Space } from 'antd';
import { SmileOutlined } from '@ant-design/icons';
import Link from 'next/link';
import Image from '../Image/CustomImage';
import DropdownContent from '../Dropdown/dropdown';
//Change here to custom NavBar
const headerObject = {
    navbarLeft: [
        {title: 'Mua', link: '#', data: [{title: 'Chung cư thường'}, {title: 'Chung cư cao cấp'}, {title: 'Nhà đất'}]},
        {title: 'Bán', link: '#', data: [{title: 'Bán chung cư'}, {title: 'Bán nhà đất'}]},
        {title: 'Thuê', link: '#', data: [{title: 'Nhà trọ sinh viên'}, {title: 'Chung cư mini'}, {title: 'Chung cư cao cấp'}]},
        {title: 'Quảng cáo', link: '#', data: [{title: 'Liên nền tảng'}, {title: 'Nền tảng hiện tại'}, {title: 'Quảng cáo'}]},
    ],
    navbarRight: [
        {title: 'Liên hệ', link: '#', data: [{title: 'Liên hệ quản trị viên'}, {title: 'Liên hệ nhân viên tư vấn'}, {title: 'Liên hệ abcxyz'}]},
        {title: 'Điều khoản', link: '#', data: [{title: 'Quy định'}, {title: 'Chính sách'}, {title: 'Khiếu nại'}]},
        {title: 'Quản lý', link: '#', data: [{title: 'Quản lý'}, {title: 'Quản lý'}, {title: 'Quản lý'}]},
        {title: 'Tài khoản', link: '#', data: [{title: 'Đăng nhập'}, {title: 'Đăng ký'}, {title: 'Administrator'}]}
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
                                    <Link className='app-header-link' href={item.link}>{item.title}</Link>
                                  </Space>
                                </Dropdown>
                            </li>)
                      })
                    }
                  </ul>
                </div>
                <div className='col-2 col-sm-2 col-md-2 position-relative app-header-logo'>
                  <div className='col-12'>
                    <Link href={'/'}> <Image className={'logoHeaderImg'} objectFit='contain' src={headerObject.logoURL} alt='LOGO'/> </Link>
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
                                    <Link className='app-header-link' href={item.link}>{item.title}</Link>
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

