import React, { useState } from 'react';
import { List, Modal } from 'antd';
import Link from 'next/link';
import Login from './_components/Login';
import Register from './_components/Register';

export default function Dropdown({data}) { 
  const [onLoginOpen, setOnLoginOpen] = useState(false);
  const [onRegisterOpen, setOnRegisterOpen] = useState(false);
  return (
    <div className='header_drop_down'>
      <List 
        itemLayout='horizontal'
        dataSource={data}
        renderItem={(item, index) => (
          <List.Item>
            {
              item.key === 'login' ? (
                <Login onLoginOpen={onLoginOpen} setOnLoginOpen={setOnLoginOpen} setOnRegisterOpen={setOnRegisterOpen}/>
              ) 
              : 
              item.key === 'register' ?
              (<Register onRegisterOpen={onRegisterOpen} setOnLoginOpen={setOnLoginOpen} setOnRegisterOpen={setOnRegisterOpen} />) 
              :
              (<Link className='header-dropdown-link' title={`Đi đến ${item.title}`} href={'#'}>{item.title}</Link>)
            }
          </List.Item>
        )}/>
    </div>
  )
}
