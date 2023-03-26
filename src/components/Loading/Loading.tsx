import React from 'react';
import { Spin } from 'antd';

const Loading: any = ({ children, loading }: any) => {
  return (
    <div className='spin-loader'>
      <div className={loading ? 'box-loader' : 'box-loader hidden'}>
        <Spin />
      </div>
      {children}
    </div>
  );
};

export default Loading;
