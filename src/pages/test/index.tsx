import SocketComponent from 'components/socket';
import React from 'react';
import { User } from 'type/user';

const Test = ({ user }: { user: User }) => {
  return (
    <div>
      <SocketComponent user={user} />
    </div>
  );
};

export default Test;
