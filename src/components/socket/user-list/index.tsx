import { Avatar, Divider } from 'antd';
import React from 'react';
import { MessageType, User } from 'type/chat';
import style from './style.module.scss';

interface Props {
  userList: User[];
  setCurrentUserChat: React.Dispatch<
    React.SetStateAction<{
      _id: string;
      firstName: string;
      image: string;
      lastName: string;
    }>
  >;
}

const UserList = ({ userList, setCurrentUserChat }: Props) => {
  return (
    <div>
      <div style={{ marginBottom: '8px' }}>
        <span style={{ fontWeight: '600' }}>Người dùng</span>
        <Divider />
      </div>
      <div style={{ height: '100%' }}>
        {userList?.map((item, index) => {
          const message: MessageType = JSON.parse(item.message);
          return (
            <div
              key={index}
              style={{
                display: 'flex',
                gap: '12px',
                margin: '8px',
                cursor: 'pointer',
                position: 'relative',
              }}
              onClick={() => {
                setCurrentUserChat(item.info);
              }}
            >
              {item.unRead ? (
                <div
                  style={{
                    position: 'absolute',
                    width: '24px',
                    height: '24px',
                    backgroundColor: '#7100fc',
                    zIndex: '999999999999',
                    borderRadius: '50%',
                    left: '20px',
                    top: '-5px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'white',
                    fontWeight: '600',
                  }}
                >
                  {item.unRead > 9 ? '9+' : item.unRead}
                </div>
              ) : null}

              <div>
                <Avatar
                  style={{ width: '44px', height: '44px' }}
                  src={item?.info?.image ? item?.info?.image : null}
                ></Avatar>
              </div>
              <div>
                <p style={{ margin: '0', fontWeight: '600' }}>
                  {item.info.firstName + ' ' + item.info.lastName}
                </p>
                <p className={style.messageElipsis}>{message.text}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default UserList;
