import React, { useState } from 'react';
import { Dropdown, Space, Avatar } from 'antd';
import { SmileOutlined } from '@ant-design/icons';
import Link from 'next/link';
import Image from '../Image/CustomImage';
import DropdownContent from '../Dropdown/dropdown';
import Cookies from 'js-cookie';
// customize header
let headerObject = {
  navbarLeft: [
      {title: 'Mua', link: '#', key: 'link', data: [{title: 'Chung cư thường', link: '#', key: 'link'}, {title: 'Chung cư cao cấp',link: '#', key: 'link'}, {title: 'Nhà đất',link: '#', key: 'link'}]},
      {title: 'Bán', link: '#', key: 'link', data: [{title: 'Bán chung cư', link: '#', key: 'link'}, {title: 'Bán nhà đất', link: '#', key: 'link'}]},
      {title: 'Thuê', link: '#', key: 'link', data: [{title: 'Nhà trọ sinh viên', link: '#', key: 'link'}, {title: 'Chung cư mini', link: '#', key: 'link'}, {title: 'Chung cư cao cấp',link: '#', key: 'link'}]},
      {title: 'Quảng cáo', link: '#', key: 'link', data: [{title: 'Chạy tin trên ZeeHome', link: '#', key: 'link'}, {title: 'Chạy tin đa nền tảng', link: '#', key: 'link'}, {title: 'Chạy tin facebook',link: '#', key: 'link'}]},
  ],
  navbarRight: [
      {title: 'Trợ giúp', link: 'help', key: 'link', data: [{title: 'Liên hệ quản trị viên', link: '#', key: 'link'}, {title: 'Liên hệ nhân viên tư vấn', link: '#', key: 'link'}, {title: 'Liên hệ abcxyz', link: '#', key: 'link'}]},
      {title: 'Điều khoản', link: '#', key: 'link', data: [{title: 'Quy định', link: '#', key: 'link'}, {title: 'Chính sách',link: '#', key: 'link'}, {title: 'Khiếu nại',link: '#', key: 'link'}]},
      {title: 'Quản lý', link: '#', key: 'link', data: [{title: 'Quản lý', link: '#', key: 'link'}, {title: 'Quản lý', link: '#', key: 'link'}, {title: 'Quản lý', link: '#', key: 'link'}]},
      {title: 'Tài khoản', key: 'no-link', data: [{title: 'Đăng nhập', key: 'login'}, {title: 'Đăng ký', key: 'register'}, {title: 'Administrator', key: 'link', link: '#'}]}
  ],
  logoURL: '/static/logo/logo.png'
}

const navStyle = ['origin', 'logo_center', 'no-logo'];
export default function Header(props) {
  const {router} = props;
  const {user} = props;
  console.log(user);
  if (user) {
    headerObject.navbarRight.pop();
    headerObject.navbarRight.push(
      {
        title: <Avatar src={user.image}/>,
        data: [
          {
            title: `${user.firstName} ${user.lastName}`,
          },
          {
            title: 'Thông báo',
            key: 'link',
            link: '#'
          },
          {
            title: `Trang cá nhân `,
            key: 'link',
            link: '/account'
          },
          {
            title: `Đăng xuất`, key: 'logout'
          },
        ]
      }
    );
  }
  const [dropDownOpen, setDropDownOpen] = useState();
    return (
        <div className='container app-header'>
            <div className='row'>
            <div className='col-5 col-sm-5 col-md-5'>
                  <ul className='d-flex app-header-ul justify-content-start'>
                    {
                      headerObject.navbarLeft.map((item, index) => {
                          return (
                            <li className='app-header-item me-4 ' key={index}>
                                <Dropdown placement='bottom' dropdownRender={() => <DropdownContent router={router} data={item.data}/>}>
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
                                <Dropdown placement='bottom' dropdownRender={() => <DropdownContent user={user} setDropDownOpen={setDropDownOpen} data={item.data}/>}>
                                  <Space>
                                   {
                                    item.key === 'link' ?  <Link className='app-header-link' href={item.link}>{item.title}</Link> : <div className='app-header-link'>{item.title}</div>
                                   }
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

