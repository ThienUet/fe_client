import React from 'react';
import { Spin } from 'antd';

interface Props {
  loading: boolean;
}

export default function Loading({ loading }: Props) {
  return (
    <div className='spin-loading'>
      <Spin loading={loading} />
    </div>
  );
}
