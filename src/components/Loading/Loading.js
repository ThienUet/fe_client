import React from 'react';
import { Spin } from 'antd';

export default function Loading({loading}) {
  return (
    <div className='spin-loading'>
        <Spin loading={loading} />
    </div>
  )
}
