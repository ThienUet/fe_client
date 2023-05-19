import dynamic from 'next/dynamic';
const SocketComponent = dynamic(() => import('../../components/socket'), { ssr: false });
import React from 'react';
import { User } from 'type/user';

interface Props {
  user: User;
}

const Chat = ({ user }: Props) => {
  return (
    <div>
      <SocketComponent user={user} />
    </div>
  );
};

export default Chat;
