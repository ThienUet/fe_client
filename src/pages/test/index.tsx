import SocketComponent from 'components/socket';
import React, { useState } from 'react';

const Test = () => {
  const [check, setCheck] = useState<boolean>(true);
  const [render, setRender] = useState<any>();

  return (
    <div>
      <SocketComponent />
    </div>
  );
};

export default Test;
