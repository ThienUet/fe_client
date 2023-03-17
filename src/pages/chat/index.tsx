import React from 'react';

const Chat = () => {
  return (
    <div style={{ display: 'flex', height: '100vh', width: '100vw' }}>
      <div style={{ flex: '0.3' }}>
        <div>
          <p>Chats</p>
        </div>
        <div>Inbox</div>
        <div></div>
      </div>
      <div style={{ flex: '0.4' }}></div>
      <div style={{ flex: '0.3' }}></div>
    </div>
  );
};

export default Chat;
