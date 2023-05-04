import React from 'react';
import { Button } from 'antd';
const DonePayment: React.FC = () => {
  return (
    <div className='done-payment'>
      <div className='title'>Thanh toán thành công !</div>
      <p>Bạn đã thanh toán thành công ! Vui lòng chọn các lựa chọn bên dưới</p>
      <div className='action-payment-done'>
        <Button onClick={() => window.location.replace('/')}>Về trang chủ</Button>
        <Button onClick={() => window.location.replace('/account?profileTab=payment-history')}>
          Xem lại lịch sử thanh toán
        </Button>
      </div>
    </div>
  );
};

export default DonePayment;
