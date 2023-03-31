import moment from 'moment';
import React from 'react';

export default function UserView({ user }: { user: any }) {
  // console.log(user);
  return (
    <div className='user-info-profile'>
      <div className='name'>
        <div className='name-label'>Tên người dùng:</div>{' '}
        <div className='name-value'>
          {user?.firstName} {user?.lastName}
        </div>
      </div>
      <div className='gender'>
        <div className='gender-label'>Giới tính:</div>
        <div className='gender-value'>{user?.gender === 'male' ? 'Nam' : 'Nữ'}</div>
      </div>
      <div className='birth-date'>
        <div className='birth-date-label'>Ngày sinh:</div>
        <div className='birth-date-value'>{moment(user?.birthDate).format('DD-MM-YYYY')}</div>
      </div>
      <div className='email'>
        <div className='email-label'>Địa chỉ email:</div>{' '}
        <div className='email-value'>{user?.email}</div>
      </div>
      <div className='phone'>
        <div className='phone-label'>Số điện thoại:</div>
        <div className='phone-value'>{user?.phoneNumber}</div>
      </div>
      <div className='balance'>
        <div className='balance-label'>Số dư tài khoản hiện có:</div>{' '}
        <div className='balance-value'>{user?.balance} VND</div>
      </div>
    </div>
  );
}
