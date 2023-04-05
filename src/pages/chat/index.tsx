import SocketComponent from 'components/socket';
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
