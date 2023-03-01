import React from 'react';
import { List } from 'antd';
import Link from 'next/link';

export default function dropdown({data}) {
  return (
    <div className='header_drop_down'>
      <List 
        itemLayout='horizontal'
        dataSource={data}
        renderItem={(item, index) => (
          <List.Item>
            <Link className='header-dropdown-link' title={`Đi đến ${item.title}`} href={'#'}>{item.title}</Link>
          </List.Item>
        )}/>
    </div>
  )
}
