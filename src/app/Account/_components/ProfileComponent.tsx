import { Avatar, Upload, Button, Image } from 'antd';
import React from 'react';

interface Props {
  user: any;
}

export default function ProfileComponent({ user }: Props) {
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
                  src={user.image || '/static/err_icon/err_load_image.png'}
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
              {!user.banned ? (
                <div className='active'>o Đang hoạt động</div>
              ) : (
                <div className='banned'>! Dừng hoạt động do vi phạm chính sách !</div>
              )}
            </div>
          </div>
          <div className='col-9'></div>
        </div>
      </div>
    </React.StrictMode>
  );
}
