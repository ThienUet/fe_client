import LoginIn from '../../../components/Dropdown/_components/Login';
import { Avatar, Upload, Button, Image, Rate, Tabs, Input, Space, notification } from 'antd';
import moment from 'moment';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import TabsRight from './TabsRight';

export default function ProfileComponent({ user, userRefetch }: { user: any; userRefetch: any }) {
  return (
    <React.StrictMode>
      <div className='profile'>
        <div className='row'>
          <div className='col-3 left-profile'>
            <div className='avatar-component'>
              <div className='avatar'>
                {/* NEED OPTIMIZE */}
                <Image
                  height={'100%'}
                  width={'100%'}
                  src={user?.image || '/static/err_icon/err_load_image.png'}
                  alt='image'
                />
              </div>
              <div className='avatar-upload'>
                <Upload>
                  <Button>Sửa ảnh</Button>
                </Upload>
              </div>
            </div>
            <div className='status'>
              {!user?.banned ? (
                <div className='active'>o Tình trạng: Hoạt động </div>
              ) : (
                <div className='banned'>
                  Dừng hoạt động do vi phạm chính sách ! Liên hệ với quản trị viên để được giải đáp
                  !
                </div>
              )}
            </div>
            <div className='user-intro'>
              Tiểu sử:
              <div className='data'>{user?.intro}</div>
            </div>
            <div className='user-gender'>
              Giới tính:
              <div className='data'>{user?.gender === 'male' ? 'Nam' : 'Nữ'}</div>
            </div>
            <div className='user-dateBirth'>
              Ngày sinh:
              <div className='data'>{moment(user?.birthDate).format('DD-MM-YYYY')}</div>
            </div>
            <div className='user-balance'>
              Số dư:
              <div className='data'>{user?.balance} VND</div>
            </div>
            <div className='user-rating'>
              Đánh giá:
              <div className='data'>
                <Rate disabled={true} value={user?.avgRating} />
              </div>
            </div>
            <div className='user-join-date'>
              Ngày tham gia:
              <div className='data'>{moment(user?.registerAt).format('DD-MM-YYYY')}</div>
            </div>
          </div>
          <div className='col-9 right-profile'>
            <div className='title'>
              {user?.firstName} {user?.lastName}
            </div>
            <div className='user-id'>
              ID:
              <Space.Compact style={{ width: '100%' }}>
                <Input
                  value={user?.userId}
                  readOnly
                  onCopy={(e) => {
                    e.preventDefault();
                    return false;
                  }}
                />
                <Button
                  onClick={() => {
                    navigator.clipboard.writeText(user?.userId);
                    notification.success({ message: 'Đã sao chép !' });
                  }}
                  title='Sao chép'
                  type='primary'
                >
                  <i className='fa fa-clipboard' aria-hidden='true' />
                </Button>
              </Space.Compact>
            </div>
            <TabsRight userRefetch={userRefetch} user={user} />
          </div>
        </div>
      </div>
    </React.StrictMode>
  );
}
